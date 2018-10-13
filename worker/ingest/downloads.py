import asyncio
from pathlib import Path
from typing import Tuple, Optional
from uuid import uuid4
import logging

from api.create import create_anime, save_character_and_dialogues, create_file_and_episode, create_archive
from api.schema.character import Character
from ingest.file.archive import is_archive, extract
from ingest.file.system import extract_subtitle_info
from ingest.resolvers.anime_resolver import find_mal_id, find_anilist_id, is_valid_anime
from ingest.resolvers.character_resolver import get_anime_characters, match_characters
from ingest.sub_groups import sort_by_sub_groups
from ingest.subs import load_subs, parse_subtitles, sub_length
from api.database import session
from api.schema.anime import Anime
from api.queries import find_file, anime_exists, find_anime, find_archive
from api.schema.archive import Archive
from api.schema.file import File
from api.schema.episode import Episode
from tools.utility import flatten

logger = logging.getLogger(__name__)


async def process_file(file_path: Path, link_url=None,
                       archive_name: Optional[str] = None,
                       archive_id: Optional[str] = None
                       ) -> Tuple[Optional[str], Optional[str]]:
    """
    Processes a downloaded subtitle file

    Args:
        archive_name: name of the archive extracted from
        archive_id: id of the archive extracted from
        file_path: The Path object of the file that will
            be parsed
        link_url: The url that the file was downloaded from
    Returns:
        Episode - object with all relative sub-objects
            like dialogues and characters as a part of the
            episode
    Notes:
        All entities returned from the function
        must be added into the global session
    """

    def attach_metadata(character: Character):
        character.anime_id = existing_anime_id
        character.episode_id = ep_id
        return character

    await asyncio.sleep(0.1)
    existing = await find_file(file_path.name)

    if existing:
        logger.info(f'File {file_path.name} already in storage, skipping...')
        return None, None

    sub = load_subs(file_path)

    sub_group, anime_name, episode_num = extract_subtitle_info(file_path)

    if archive_id:
        existing_archive_id = archive_id
    elif archive_name:
        existing_archive_id = await find_archive(archive_name)
    else:
        existing_archive_id = None

    mal_id, certainty = await find_mal_id(anime_name)

    valid_anime = is_valid_anime(certainty)

    # This should ideally be checked before
    # the files are broken down however it is
    # very very likely that at some point all files
    # will be downloaded in the form of single files
    # which means we should be checking animes for
    # every single subtitle file instead of per-archive
    existing_anime_id: Optional[str] = await find_anime(anime_name)

    if not existing_anime_id:
        anime = Anime()
        anime.malId = mal_id
        anime.rawName = anime_name

        if valid_anime:
            anime.anilistId = await find_anilist_id(mal_id)

        existing_anime_id = await create_anime(anime)

    episode = Episode()
    episode.subGroup = sub_group
    episode.episodeNumber = episode_num
    episode.length = sub_length(sub)
    episode.anime_id = existing_anime_id

    file_id, ep_id = await create_file_and_episode(
        anime_id=str(existing_anime_id),
        file_name=file_path.name,
        episode=episode,
        archive_id=existing_archive_id,
        file_url=link_url
    )

    characters = await parse_subtitles(sub, ep_id, existing_anime_id, anime_name)

    anilist_chars = await get_anime_characters(mal_id)

    matched_characters = await match_characters(characters, anilist_chars, anime_name)

    # matched_characters = list(map(attach_metadata, matched_characters))

    for char in matched_characters:
        await save_character_and_dialogues(char)

    return ep_id, file_id


async def process_archive(archive_path: Path, link_url: str, delete=True, sess=None):
    """
    Processes and entire archive containing subtitle files

    As of now, it's assumed that an archive represents one
    season
    Args:
        archive_path: Path to the downloaded archive
            (normally resides in the downloads folder inside
            the project)
        link_url: Url that the archive was downloaded from
        delete: Delete archive afterwards?
    """
    logging.info(f'Extracting archive from {archive_path.name}')
    files = extract(archive_path, delete=delete)

    sub_types = sort_by_sub_groups(files)
    archive_name = archive_path.name

    archive = Archive()

    archive.fileName = archive_name
    archive.linkUrl = link_url

    existing_id = await create_archive(archive)

    for grouping in sub_types:

        if not grouping:
            continue

        try:
            group, anime_name, _ = extract_subtitle_info(grouping[0])

            logger.info(f'Processing sub group {group}')

            for file in grouping:
                logger.info(f'Processing file {file.name}')
                await process_file(file,
                                   link_url=link_url,
                                   archive_name=archive_name,
                                   archive_id=existing_id)

        except Exception as e:
            logger.error(e)
            raise e
            return

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
