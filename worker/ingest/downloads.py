from pathlib import Path
from typing import Tuple, Optional
from uuid import uuid4
import logging

from ingest.file.archive import is_archive, extract
from ingest.file.system import extract_subtitle_info
from ingest.resolvers.anime_resolver import find_mal_id, find_anilist_id, is_valid_anime
from ingest.resolvers.character_resolver import get_anime_characters, match_characters
from ingest.sub_groups import sort_by_sub_groups
from ingest.subs import load_subs, parse_subtitles, sub_length
from api.database import session
from api.schema.anime import Anime
from api.queries import anime_exists, find_episode
from api.schema.archive import Archive
from api.schema.file import File
from api.schema.episode import Episode
from tools.utility import flatten

logger = logging.getLogger(__name__)


async def process_file(file_path: Path, sess=None, link_url=None) -> Tuple[Optional[Episode], Optional[File]]:
    """
    Processes a downloaded subtitle file

    Creates the instances of models:
        Episode
        Download
        Character(s)
        Dialogue(s)

    Args:
        file_path: The Path object of the file that will
            be parsed
        sess: Optional session
        link_url: The url that the file was downloaded from
    Returns:
        Episode - object with all relative sub-objects
            like dialogues and characters as a part of the
            episode
    Notes:
        All entities returned from the function
        must be added into the global session
    """
    if sess is None:
        # using global session if a specific one
        # is not provided
        sess = session

    existing = find_episode(file_path.name)

    if existing:
        logger.info(f'File {file_path.name} already in storage, skipping...')
        return None, None

    sub = load_subs(file_path)

    sub_group, anime_name, episode_num = extract_subtitle_info(file_path)

    # file download
    download = File()
    download.id = uuid4()
    download.file_name = file_path.name

    if link_url:
        download.link_url = link_url

    mal_id, certainty = await find_mal_id(anime_name)

    valid_anime = is_valid_anime(certainty)

    if valid_anime:
        anilist_id = await find_anilist_id(mal_id)
    else:
        anilist_id = None

    # This should ideally be checked before
    # the files are broken down however it is
    # very very likely that at some point all files
    # will be downloaded in the form of single files
    # which means we should be checking animes for
    # every single subtitle file instead of per-archive
    if not anime_exists(mal_id):
        anime = Anime(
            id=uuid4(),
            mal_id=mal_id,
            raw_name=anime_name
        )

        if is_valid_anime(certainty):
            anime.anilist_id = anilist_id

        sess.add(anime)

    else:
        # anime = session.query(Anime) \
        #     .filter(Anime.mal_id == mal_id).first()
        anime = None

    sess.flush()

    episode = Episode()
    episode.id = uuid4()

    sess.add(episode)

    characters = parse_subtitles(sub, episode.id, anime.id)

    anilist_chars = await get_anime_characters(mal_id)

    matched_characters = match_characters(characters, anilist_chars, anime)

    download.anime_id = anime.id

    sess.add(download)
    # sess.commit()

    episode.length = sub_length(sub)
    episode.characters += matched_characters
    episode.sub_group = sub_group
    episode.episode_number = episode_num
    episode.download_id = download.id

    anime.characters += matched_characters
    anime.episodes += [episode]

    dialogues = map(lambda i: i.dialogues, matched_characters)

    # all_dialogues = flatten(dialogues)

    sess.flush()

    for char in matched_characters:
        sess.merge(char)

    sess.merge(anime)

    return episode, download


async def process_archive(archive_path: Path, link_url: str, delete=True):
    """
    Processes and entire archive containing subtitle files

    As of now, it's assumed that an archive represents one
    season
    Args:
        archive_path: Path to the downloaded archive
            (normally resides in the downloads folder inside
            the project)
        link_url: Url that the archive was downloaded from
        session: Session to use for committing to the db
        delete: Delete archive afterwards?
    """
    logging.info(f'Extracting archive from {archive_path.name}')
    files = extract(archive_path, delete=delete)

    sub_types = sort_by_sub_groups(files)
    archive_name = archive_path.name

    download = Archive(
        id=uuid4(),
        link_url=link_url,
        file_name=archive_name
    )

    for grouping in sub_types:

        if not grouping:
            # empty group?
            continue

        try:
            group, anime_name, _ = extract_subtitle_info(grouping[0])

            logger.info(f'Processing sub group {group}')

            for file in grouping:
                logger.info(f'Processing file {file.name}')
                await process_file(file, link_url=link_url)

                session.commit()

        except Exception as e:
            logger.error(e)
            session.commit()
            session.close()
            return

    session.add(download)
    session.commit()
    session.close()

    # Might want some webhook integration option here
    # the tells about the episode anime that just got
    # processed


async def process_download(download_location: Path, link_url: str, delete=True):
    """
    Processes the downloaded file, whether that is an archive or a
    file
    Args:
        download_location: Path to the downloaded media
        link_url: URL that the download came from
        delete: Delete the original download?
    """
    if is_archive(download_location):
        return await process_archive(download_location, link_url, delete)
    return await process_file(download_location, link_url=link_url)
