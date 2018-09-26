from ingest.file import logger
from ingest.sub_groups import GENERIC_SUBS_PATTERN, has_generic_sub_format

from functools import reduce
from typing import List, Callable, Optional, Tuple
import os
from pathlib import Path


GlobCallback = Callable[[Path], bool]


def is_sub_file(path: Path) -> bool:
    """
    Args:
        path: path to the file being read
    Returns:
       bool - is sub file
    """
    return path.suffix == '.ass'


def is_valid_sub(file: Path) -> bool:
    constraints = [has_generic_sub_format(file), is_sub_file(file)]
    return all(constraints)


def glob(path: Path, f_filter: GlobCallback = lambda f: True) -> List[Path]:
    """
    Globs every file that matches a filter under the given directory
    Args:
        path: relative path of the directory
        f_filter: filter to use when going through the files, fetches all files by default
    Examples:
        ```lambda file_path: is_correct_file(file_path)```

    Returns:
        List[str] - paths of all files matching the filter relative
            to the given directory
    """
    logger.info(f'Globbing files from {path}')

    def r(coll: List[Path], parts: tuple):
        folder, _, all_files, = parts

        targets = [
            Path(folder).joinpath(file) for file in all_files
            if f_filter(Path(file))
        ]

        # concat
        coll += targets
        return coll

    files = list(os.walk(str(path)))

    return reduce(r, files, [])


SubtitleInfoType = Optional[Tuple[str, str, str]]


def extract_subtitle_info(path: Path) -> SubtitleInfoType:
    """
    Gets the subtitle information from a valid subtitle

    Notes:
        Sometimes the episode number is not a number, EX: 'SP1'
        we need to be checking for those cases first before assuming
        that the episode number is a number

    """

    match = GENERIC_SUBS_PATTERN.match(path.name)

    if not match:
        return

    group = match.group('sub_group')
    name = match.group('name')
    episode = match.group('episode')

    return group, name, episode
