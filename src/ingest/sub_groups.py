from functools import reduce
from pathlib import Path
from typing import List

import re
import logging

logger = logging.getLogger(__name__)

# Don't really care what's after the brackets of sub groups
# we just need a way to delimit the matching so we can capture
# the episode number properly.

# These cover majority of the common sub groups that I've seen.
# At some point we'll need to add parsers for less common subs,
# but for now, this should be good enough.

# Also: Episodes aren't always in the format of numbers so
# we can't use digit matching (sometimes they're OVAs or specials).

# $ <sub_group> - Name of the subbing group [HorribleSubs, Erai-raws, etc...]
# $ <name>      - Nicely formatted anime name
# $ <episode>   - Episode number

GENERIC_SUB_REGEX = r'\[(?P<sub_group>.+)\] (?P<name>.+) - (?P<episode>.+) [\[(]'
GENERIC_SUBS_PATTERN = re.compile(GENERIC_SUB_REGEX)

# This is going to be a whole bunch of hit and miss but
# certain sub groups just don't have worthwhile data
BLACKLISTED_GROUPS = [
    'Doki'
]


def is_valid_subtitle(file: Path) -> bool:
    logger.debug(f'Checking subtitle for {file.name}')
    match = GENERIC_SUBS_PATTERN.match(file.name)

    if match is None:
        return False

    group = match.group('sub_group')

    result = group not in BLACKLISTED_GROUPS

    logger.debug(f'{file.name} is valid = {result}')

    return result


def filter_subtitles(file: List[Path]) -> List[Path]:
    return [f for f in file if is_valid_subtitle(f)]


def has_generic_sub_format(file: Path) -> bool:
    return bool(GENERIC_SUBS_PATTERN.match(file.name))


def sort_by_sub_groups(files: List[Path]) -> List[List[Path]]:
    from ingest.file.system import extract_subtitle_info

    def r(coll: dict, path: Path):
        result = extract_subtitle_info(path)

        if result is None:
            # invalid subtitle
            return coll

        sub_group, _, _ = result

        if sub_group not in coll:
            coll[sub_group] = []

        coll[sub_group].append(path)

        return coll

    paths = reduce(r, files, {})

    paths_list = paths.values()

    out = map(filter_subtitles, paths_list)

    return list(out)
