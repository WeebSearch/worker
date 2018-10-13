import json
from datetime import datetime

import dotenv

from api.cache import cache
import asyncio

dotenv.load_dotenv()

import logging
import sys
from pathlib import Path
import argparse
import pysubs2

from ingest.downloads import process_archive, process_download
from ingest.subs import load_subs, is_valid_line
from tools.cli import init_cli


async def main():
    # parser = init_cli()
    # print(parser.parse_args(sys.argv[1:]))

    rar_path = Path('downloads/New_Game_TV2_2017_Eng.rar')
    await process_download(rar_path,
                           link_url='http://subs.com.ru/page.php?id=44106&a=dl', delete=False)


if __name__ == '__main__':
    import tools.logger

    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
