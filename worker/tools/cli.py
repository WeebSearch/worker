import argparse


def init_cli() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description='A script for extracting info from subtitles',
    )

    parser.add_argument('clean', help='Cleans out the download folder from all the downloads')
    parser.add_argument('--file', nargs='*')

    return parser
