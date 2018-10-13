import asyncio
import json
import logging
import os
from functools import reduce
from typing import Union, Optional

import aiohttp

from datetime import datetime

from api import CACHE_EXPIRE_TIME
from api.cache import cache

logger = logging.getLogger(__name__)

internal = aiohttp.ClientSession()
external = aiohttp.ClientSession()

DATABASE_DEFAULT_URL = 'http://localhost:4466'
DATABASE_URL = os.getenv('PRISMA_ENDPOINT', DATABASE_DEFAULT_URL)

if not DATABASE_URL:
    logger.error(
        f'DATABASE_URL was not found, defaulting to {DATABASE_DEFAULT_URL}')


def extract(response_dict: dict, *path):
    try:
        return reduce(lambda d, key: d[key], path, response_dict)
    except (KeyError, TypeError) as e:
        logger.error(f'Unexpected dictionary structure while traversing for "{path}"')
        logger.debug(f'Traversed dict: {response_dict}')
        return None


async def query(query_body: str, variables: dict) -> aiohttp.ClientResponse:
    start = datetime.now()

    data = {
        'query': query_body,
        'variables': variables
    }
    headers = {
        'Content-Type': 'application/json'
    }

    async with aiohttp.ClientSession() as sess:
        await asyncio.sleep(0.1)
        out = await sess.post(DATABASE_URL, json=data, headers=headers)

        end = datetime.now()
        logger.debug(f'Got response from database in {(end - start).microseconds}ms')

        return out


async def find_anime(raw_name: str) -> Optional[str]:
    cache_target = f'queries:internal:find_anime:{raw_name}'
    cached = cache.get(cache_target)

    if cached:
        return cached.decode('utf-8')

    logger.debug(f'Finding anime with name {raw_name}')
    q = fetch_query('internal', 'find_anime')

    result = await query(q, {
        'rawName': raw_name
    })

    if result is None:
        return

    out = extract(await result.json(), 'data', 'anime', 'id')

    cache.set(cache_target, out, ex=CACHE_EXPIRE_TIME)

    return out


async def anime_exists(raw_name: str) -> bool:
    return bool(find_anime(raw_name))


async def find_file(file_name: str) -> Optional[str]:
    """
    Finds the id of a file if a matching one is found
    Args:
        file_name:

    Returns:

    """
    cache_target = f'queries:internal:find_file:{file_name}'
    cached = cache.get(cache_target)

    if cached:
        return cached.decode('utf-8')

    q = fetch_query('internal', 'find_file')

    result = await query(q, {
        'fileName': file_name
    })

    if result is None:
        return

    files = extract(await result.json(), 'data', 'files')

    if not files:
        return

    if len(files) > 1:
        logger.warning(f'Found more than one entry for file with name "{file_name}"')
        logger.debug([file['id'] for file in files])

    result = extract(files.pop(), 'id')

    cache.set(cache_target, result, ex=CACHE_EXPIRE_TIME)

    return result


async def file_exists(file_name: str) -> bool:
    return bool(find_file(file_name))


async def find_character(anime_name: str, character_name: str) -> Optional[int]:
    cache_target = f'queries:internal:find_character:{anime_name}:{character_name}'

    cached = cache.get(cache_target)

    if cached:
        return cached.decode('utf-8')

    logger.debug(f'Searching for character {character_name} in the database')
    q = fetch_query('internal', 'find_character.name')

    result = await query(q, {
        'animeRawName': anime_name,
        'characterRawName': character_name
    })

    if result is None:
        return

    collection: Optional[list] = extract(await result.json(), 'data', 'characters')

    if len(collection) > 1:
        logger.warning(
            f'Found duplicate entries for character {character_name} in anime {anime_name}.')
        logger.debug(collection)

    if not collection:
        return

    out = collection.pop(0)['id']

    cache.set(cache_target, out, ex=CACHE_EXPIRE_TIME)

    return out


async def find_archive(raw_name: str):
    cache_target = f'queries:internal:find_archive:{raw_name}'

    cached = cache.get(cache_target)

    if cached:
        return cached.decode('utf-8')

    q = fetch_query('internal', 'find_archive')

    response = await query(q, {
        'fileName': raw_name
    })

    arr: Optional[list] = extract(await response.json(), 'data', 'archives')

    if not arr:
        return

    if len(arr) > 1:
        logger.warning(
            f'Found duplicate entries for character {character_name} in anime {anime_name}.')
        logger.debug(arr)

    out = arr.pop(0)['id']

    cache.set(cache_target, out, ex=CACHE_EXPIRE_TIME)

    return out


def fetch_query(folder: str, file_name: str) -> str:
    with open(f'worker/api/queries/{folder}/{file_name}.graphql', 'r') as f:
        return f.read()
