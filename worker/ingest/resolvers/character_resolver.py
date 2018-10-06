import json
import pickle
from datetime import datetime
from typing import List, Dict, Tuple, Optional

import aiohttp
from fuzzywuzzy import fuzz

from ingest.resolvers import ANILIST_ENDPOINT, is_request_successful
from ingest.resolvers.anime_resolver import is_anilist_query_failed, RequestException
from api.queries import fetch_query, find_character, external
from api import CACHE_EXPIRE_TIME
from api.cache import cache
from api.database import session
from api.schema.anime import Anime
from api.schema.character import Character
from tools.protocols import AnilistCharacter
from tools.utility import find_elem
from functools import reduce, partial
import logging

logger = logging.getLogger(__name__)


async def extract_character_info(res: aiohttp.ClientResponse):
    data = await res.json()
    if is_anilist_query_failed(data):
        raise RequestException(data['errors'])
    return data['data']['Media']['characters']['nodes']


async def get_anime_characters(mal_id: int, caching=True) -> Optional[List[AnilistCharacter]]:
    """
    Fetches the names of all the characters in an anime
    Args:
        mal_id: mal id of the anime
        caching: whether to

    Returns:
        List[AnilistCharacter]
        [{
            'id': int,
            'name': {
                'first': str,
                'last': str,
                'native': str
            }
        }]
    """

    query = fetch_query('external', 'fetch_characters')

    logger.info(
        f'Attempting to fetch character information for anime {mal_id}')
    # use query() here
    data = {
        'query': query,
        'variables': {
            'id': mal_id
        }
    }

    key = json.dumps(data)

    if caching:
        cached_result = cache.get(f'queries:characters:{key}')
        if cached_result:
            logger.debug(f'Cache hit for character resolver on id {mal_id}.')
            return pickle.loads(cached_result)

    start_date = datetime.now().replace(microsecond=0)

    try:
        result = await external.post(ANILIST_ENDPOINT, json=data)
        result.raise_for_status()
    except aiohttp.client_exceptions.ClientError as e:
        logger.error(f'Something went wrong trying to fetch character data, status_code={result.status_code}')
        logger.error(e)
        return

    end_time = datetime.now().replace(microsecond=0)

    logger.info(f'Got response from AniList in {end_time - start_date}')

    characters = await extract_character_info(result)

    if caching:
        serialized = pickle.dumps(characters)
        cache.set(
            f'queries:characters:{key}',
            serialized,
            ex=CACHE_EXPIRE_TIME
        )

    return characters


async def match_characters(inputs: List[Character],
                           characters: List[AnilistCharacter],
                           anime_raw_name: str) -> List[Character]:
    """
    Matches a list of given strings with a list of
    other possibilities based on fuzz
    Args:
        inputs:
            set of character names gotten from subtitle files
        characters:
            list of characters gotten from anilist search in the
            structure of AnilistCharacter
        anime:
            Anime to resolve characters from
    Returns:
        Dict[str, Tuple[int, int]] - character names mapped to
        the anilist id of the closest matching character and
        the certainty of the match
        {
            'name': (anilist id, certainty)
        }
    Examples:
        Matching aoba to Aoba
        { 'aoba': (12245, 92) }
    """

    def calculate_fuzz(name: str, compare: str) -> int:
        """Case insensitive comparison"""
        if name is None:
            return 0

        name = name.lower()
        compare = compare.lower()

        return fuzz.ratio(name, compare)

    def best_match(to_match: str, character: dict) -> Tuple[int, int]:
        match_names = partial(calculate_fuzz, compare=to_match)

        certainties = (
            (character['id'], match_names(character['name']['first'])),
            (character['id'], match_names(character['name']['last'])),
            (character['id'], match_names(character['name']['native']))
        )

        # max of best matching name
        return max(certainties, key=lambda k: k[1])

    async def transform(coll: dict, input_character: Character) -> Dict[str, Character]:
        # character already exists if it has the same
        # raw name and anime id as another character
        result = await find_character(anime_raw_name, input_character.rawName)

        # no need to match characters if the anilist id is already
        # present in the database

        if result and input_character.id and input_character.id != result:
            # a character with an id is upserted instead, upserted
            # characters only get their dialogue relations modified
            coll[input_character.rawName].id = result
            coll[input_character.rawName].dialogues += input_character.dialogues
            return coll

        names = map(
            lambda d: best_match(input_character.rawName, d),
            characters
        )

        matching = max(names, key=lambda k: k[1])

        anilist_id, certainty = matching

        if certainty < 60:
            # cutoff point
            coll[input_character.rawName] = input_character
            return coll

        matching_object = find_elem(
            characters, lambda e: e['id'] == anilist_id
        )

        if not matching_object:
            coll[input_character.rawName] = input_character
            return coll

        # characters with unknown names have None type which is
        # still valid so we have to assign it to an empty string
        # on an empty value so the join doesnt explode when it sees None
        first_name = matching_object['name'].get('first') or ''
        last_name = matching_object['name'].get('last') or ''

        if not first_name and not last_name:
            name = '__UNMATCHABLE__'
        else:
            name = ' '.join([first_name, last_name]).strip()

        input_character.name = name
        input_character.certainty = certainty
        input_character.anilistId = anilist_id

        # using raw_name because parsed name might overlap
        # with characters that get matched against the same thing
        coll[input_character.rawName] = input_character

        return coll

    logger.info(
        f'Attempting to match {len(inputs)} inputs with {len(characters)} possible characters.')

    if not characters:
        return []

    results = {}
    for char in inputs:
        # can't pass a coroutine into reduce unfortunately
        results = await transform(results, char)

    to_list = list(results.values())

    logger.debug(f'Done matching characters')

    return to_list
