import asyncio
from pathlib import Path
from typing import List
from requests_futures.sessions import FuturesSession
import os
import logging

from src.crawlers.subs.settings import USER_AGENT
from src.ingest.downloads import process_download

logger = logging.getLogger(__name__)


def extract_download_name(url: str) -> str:
    url_sections = url.split('/')

    # last portion of the download url is the name
    return url_sections[-1]


def download_archives(urls: List[str], cookie: str) -> None:
    """
    Downloads list of archives
    Important:
        The website we're scraping actually requires cookies to be set
        For it to serve files
    """

    headers = {
        'Cookie': cookie,
        'User-Agent': USER_AGENT
    }

    # test mode download
    new_urls = urls[:1]
    session = FuturesSession()
    logger.info(f'Downloading {len(new_urls)} files...')

    responses = [
        session.get(url, headers=headers).result() for url in new_urls
    ]

    logger.info(f'Saving {len(responses)} files to disk')

    for response in responses:
        save_name = extract_download_name(response.url)
        save_location = Path('downloads').joinpath(save_name)

        with open(save_location, 'wb') as f:
            f.write(response.content)
            print(response)
        loop = asyncio.get_event_loop()
        loop.run_until_complete(process_download(save_location, response.url))

    logger.info(f'Finished writing files')
