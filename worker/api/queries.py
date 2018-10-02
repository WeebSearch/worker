from api.database import session

from typing import Union
from api.schema.file import File
from api.schema.episode import Episode

import logging

logger = logging.getLogger(__name__)


def anime_exists(mal_id: Union[str, int]):
    from api.schema.anime import Anime

    result = session.query(Anime) \
        .filter(Anime.mal_id == mal_id) \
        .first()

    is_found = result is not None
    logger.debug(f'{mal_id} found in the database: {is_found}')

    return is_found


def find_episode(file_name: str):
    res = session.query(File, Episode) \
        .filter(
        File.file_name == file_name
    ).first()

    if res is None:
        logging.debug(f'Episode {file_name} was not found in the db.')
        return

    _, episode = res

    return episode


def find_character(anilist_id: Union[str, int]):
    from api.schema.character import Character
    return session.query(Character) \
        .filter(Character.anilist_id == anilist_id) \
        .first()


def fetch_query(file_name: str) -> str:
    with open(f'src/storage/queries/{file_name}.graphql', 'r') as f:
        return f.read()
