import logging

from ingest.resolvers import MAL_HINT_ENDPOINT, ANILIST_ENDPOINT
from api import CACHE_EXPIRE_TIME
from api.cache import cache
from api.queries import fetch_query
from tools.utility import find_elem

import requests
import pickle
from typing import Tuple
from fuzzywuzzy import fuzz

logger = logging.getLogger(__name__)


class RequestException(Exception):
    """Custom class for request-related exceptions"""

    def __init__(self, exc, msg=None):
        if msg is None:
            msg = f'There was an error fetching {exc}'

        super(RequestException, self).__init__(msg)


def is_valid_anime(certainty: int) -> bool:
    """Checking validity of string matching certainty"""
    return certainty > 80


def is_anilist_query_failed(response: requests.Response) -> bool:
    """Generic anilist query error checker"""
    return 'errors' in response.json()


async def find_mal_id(name: str, caching=True) -> Tuple[int, int]:
    """
    Finds the MAL id of the best matching anime name
    from the MAL hinting endpoint

    An anime ID will always be returned by fuzzy
    matching the anime name. There should ideally
    be a threshold for the confidence value to
    be considered valid

    Args:
        name: Name to search for the MAL id of
        caching: Whether or not to check and save to cache

    Returns:
        Tuple[int, int] -
            int: the MAL id
            int: confidence out of 100

    Raises:
        RequestException - when there's an error
        getting the resources needed
    """
    endpoint = MAL_HINT_ENDPOINT + name

    logger.info(f'Searching for the mal id of {name}...')

    if caching:
        cache_query = f'queries:mal_id:{endpoint}'
        cached_result = cache.get(cache_query)
        if cached_result:
            logger.debug(f'Cache hit on mal id request for {name}.')
            return pickle.loads(cached_result)

    result = requests.get(endpoint)
    data: dict = result.json()

    category = find_elem(
        data['categories'],
        lambda cat: cat['type'] == 'anime')

    if category is None:
        logger.info('Could not get a proper response from MAL')
        raise RequestException('anime_resolver')

    items = category['items']
    names = [
        anime['name'] for anime in items
    ]
    scores = [
        (anime_name, fuzz.ratio(name, anime_name)) for anime_name in names
    ]

    # k[1] is the fuzz ratio
    best_match, confidence = max(scores, key=lambda k: k[1])
    final_result = find_elem(items, lambda item: item['name'] == best_match)

    if final_result is None:
        raise RequestException('anime_resolver')

    out = int(final_result['id']), confidence

    if caching:
        serialized = pickle.dumps(out)
        cache.set(cache_query, serialized, ex=CACHE_EXPIRE_TIME)

    return out


def fetch_anilist_id(response: requests.Response) -> int:
    """Extracts id from an Anilist response"""
    payload = response.json()

    if is_anilist_query_failed(response):
        exception = payload['errors']['message']
        raise RequestException(exception)

    return int(payload['data']['Media']['id'])


async def find_anilist_id(mal_id) -> int:
    """
    Queries anilist to get the anilist id
    from a MAL id
    Args:
        mal_id:

    Returns:
        int - anilist id
    Raises:
        RequestException - invalid mal id
    """
    query = fetch_query('fetch_id')

    data = {
        'query': query,
        'variables': {
            'id': mal_id
        }
    }

    response = requests.post(ANILIST_ENDPOINT, json=data)

    return fetch_anilist_id(response)
