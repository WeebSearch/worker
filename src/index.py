import asyncio

import logging
from pathlib import Path

from ingest.downloads import process_archive


async def main():
    logger = logging.getLogger(__name__)
    logger.info('TESTING')
    rar_path = Path('downloads/New_Game_TV_2016_Eng.rar')
    await process_archive(rar_path, link_url='http://subs.com.ru/page.php?id=44106&a=dl')


if __name__ == '__main__':
    import tools.logger

    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
