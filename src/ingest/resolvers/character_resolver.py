import json
import pickle
from datetime import datetime
from typing import List, Dict, Tuple, Optional
from fuzzywuzzy import fuzz
import requests

from ingest.resolvers import ANILIST_ENDPOINT, is_request_successful
from ingest.resolvers.anime_resolver import fetch_query, is_anilist_query_failed, RequestException
from storage import CACHE_EXPIRE_TIME
from storage.cache import cache
from storage.database import session
from storage.models.anime import Anime
from storage.models.character import Character, anime_appearances
from tools.protocols import AnilistCharacter
from tools.utility import find_elem
from functools import reduce, partial
import logging

logger = logging.getLogger(__name__)


def extract_character_info(res: requests.Response):
    if is_anilist_query_failed(res):
        raise RequestException(res.json()['errors'])
    return res.json()['data']['Media']['characters']['nodes']


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

    query = fetch_query('fetch_characters')

    logger.info(
        f'Attempting to fetch character information for anime {mal_id}')
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
        result = requests.post(ANILIST_ENDPOINT, json=data)
        result.raise_for_status()
    except requests.exceptions.RequestException as e:
        logger.error(f'Something went wrong trying to fetch character data, status_code={result.status_code}')
        logger.error(e)
        return

    end_time = datetime.now().replace(microsecond=0)

    logger.info(f'Got response from AniList in {end_time - start_date}')

    characters = extract_character_info(result)

    if caching:
        serialized = pickle.dumps(characters)
        cache.set(
            f'queries:characters:{key}',
            serialized,
            ex=CACHE_EXPIRE_TIME
        )

    return characters


def match_characters(inputs: List[Character],
                     characters: List[AnilistCharacter],
                     anime: Anime
                     ) -> List[Character]:
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

    def transform(coll: dict,
                  input_character: Character
                  ) -> Dict[str, Character]:
        # character already exists if it has the same
        # raw name and anime id as another character
        result = session \
            .query(Character, anime_appearances) \
            .filter(
                # note: sometimes because sqlalchemy is totally amazing we
                # end up finding the same row we're already working with
                # so we have to make sure it's not the same id
                Character.raw_name == input_character.raw_name
                and anime_appearances.anime_id == anime.id
            ).first()

        # no need to match characters if the anilist id is already
        # present in the database

        if result and result[0].id != input_character.id:
            existing, _, _ = result
            # only updating dialogues in this case
            existing.dialogues += input_character.dialogues
            # coll[input_character.raw_name] = existing
            # session.expire(input_character)
            session.commit()
            return coll

        names = map(
            lambda char: best_match(input_character.raw_name, char),
            characters
        )

        matching = max(names, key=lambda k: k[1])

        anilist_id, certainty = matching

        if certainty < 60:
            # cutoff point
            coll[input_character.raw_name] = input_character
            return coll

        matching_object = find_elem(
            characters, lambda e: e['id'] == anilist_id
        )

        if not matching_object:
            coll[input_character.raw_name] = input_character
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
        input_character.anilist_id = anilist_id

        # using raw_name because parsed name might overlap
        # with characters that get matched against the same thing
        coll[input_character.raw_name] = input_character

        return coll

    logger.info(
        f'Attempting to match {len(inputs)} inputs with {len(characters)} possible characters.')

    if not characters:
        return []

    results = reduce(transform, inputs, {})

    to_list = list(results.values())

    logger.debug(f'Done matching characters')

    return to_list
