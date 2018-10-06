import asyncio
import logging
from typing import Optional, Tuple, List
from requests import Response

from api.schema.anime import Anime
from api.schema.archive import Archive
from api.schema.character import Character
from api.schema.dialogue import Dialogue
from api.schema.episode import Episode

from api.queries import fetch_query, query, extract

logger = logging.getLogger(__name__)


async def create_file_and_episode(
        anime_id: str,
        file_name: str,
        episode: Episode,
        archive_id: Optional[str] = "",
        file_url: Optional[str] = "",
) -> Tuple[str, str]:
    """
    Saves the file and episode in the database
    Args:
        anime_id: id of the anime the ep and file are from
        file_name: full name of the file
        episode: episode object
        archive_id: the archive the files were extracted from
        file_url: the URL the file was downloaded from if
            it wasn't extracted from an archive
    Returns:
        (file_id, episode_id)
    """
    q = fetch_query('internal', 'create_file')
    ep = vars(episode)
    ep['anime'] = {
        'connect': {
            'id': ep['anime_id']
        }
    }
    del ep['anime_id']

    var = {
        'animeId': anime_id,
        'archiveId': archive_id,
        'fileName': file_name,
        'fileUrl': file_url,
        'episode': ep
    }

    result = await query(q, var)

    data = extract(await result.json(), 'data', 'createFile')

    file_id = data['id']
    ep_id = data['episode']['id']

    return file_id, ep_id


async def create_archive(archive: Archive):
    """
    Saves the archive to the database
    Args:
        archive: Archive object
    Returns:

    """
    q = fetch_query('internal', 'create_archive')

    result: Response = await query(q, {
        **(vars(archive))
    })

    if result is None:
        return

    return extract(await result.json(), 'data', 'createArchive', 'id')


async def save_character_and_dialogues(
        character: Character) -> int:
    """
    Upserts a character and their dialogues to the
    database. A new character is created if no id is
    given, if an ID is given, only new dialogues are
    created without modifying other fields
    References:
        api.queries.internal.upsert_character.graphql
    Args:
        character: character to add
    Returns:
        id of the new character
    """

    def connect_dialogues(dialogue: Dialogue) -> dict:
        parsed = vars(dialogue)
        parsed['episode'] = {
            'connect': {
                'id': dialogue.episode_id
            }
        }
        parsed['anime'] = {
            'connect': {
                'id': dialogue.anime_id
            }
        }
        del parsed['episode_id']
        del parsed['anime_id']
        return parsed

    logger.debug(f'Upserting character "{character.rawName}"')

    q = fetch_query('internal', 'upsert_character')

    parsed_dialogues = list(map(connect_dialogues, character.dialogues))
    char = vars(character)
    # del char['dialogues']

    response = await query(q, {
        **char,
        # unpacking char.dialogues but overriding it
        'dialogues': parsed_dialogues,
        'characterId': char.get('id', '0') or "0"
    })

    if response is None:
        return 0

    return extract(await response.json(), 'data', 'upsertCharacter', 'id')


async def create_anime(anime: Anime) -> Optional[str]:
    """
    Attempts to create a new anime
    Args:
        anime: anime to add
    Returns:
    """
    q = fetch_query('internal', 'create_anime')

    await asyncio.sleep(0.1)

    response = await query(q, vars(anime))

    return extract(await response.json(), 'data', 'createAnime', 'id')
