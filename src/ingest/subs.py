import logging

from sqlalchemy.dialects.postgresql import UUID

from ingest.sub_groups import GENERIC_SUBS_PATTERN
from storage.database import session
from storage.models.dialogue import Dialogue
from storage.models.character import Character, anime_appearances
from ingest.file.system import is_sub_file, extract_subtitle_info

import re
import os
from pathlib import Path
import pysubs2
from uuid import uuid4
from functools import reduce
from typing import List, Mapping, Dict, Tuple, Optional

logger = logging.getLogger(__name__)

ParsedSubs = Tuple[int, Dict[str, Character]]

# lazy matching control characters
CONTROL_CHARACTER_REGEX = r'{\\.+?}'


def sort_by_titles(paths: List[Path]) -> Mapping[str, List[Path]]:
    """
    Groups a potentially mixed group of animes by their anime title
    and path
    Args:
        paths: anime subtitle paths to analyze

    Returns:
        Mapping[str, List[Path]]
        {
            'anime name': List[Path]
        }

    """

    def r(coll: dict, path: Path):
        result = extract_subtitle_info(path)

        if result is None:
            return coll

        sub_group, anime_name, _ = result

        if anime_name not in coll:
            coll[anime_name] = []

        coll[anime_name].append(path)

        return coll

    return reduce(r, paths, {})


def load_subs(path: Path) -> pysubs2.SSAFile:
    """
    Loads subtitles from a relative path as opposed
    to the absolute path that pysubs2 restricts
    the user to
    Args:
        path: relative path of the subtitle location
    Returns:
        pysubs2 subtitle file
    Raises:
        FileNotFoundError - invalid path
    """
    if not is_sub_file(path):
        raise ValueError(f'{path} is not a subtitle file')

    destination = os.path.abspath(str(path))
    return pysubs2.load(destination)


def extract_sub_name(path: Path) -> Optional[str]:
    match = GENERIC_SUBS_PATTERN.match(path.name)

    if match is None:
        return

    return match.group('name')


def parse_subtitles(sub: pysubs2.SSAFile, episode_id: UUID, anime_id: UUID) -> List[Character]:
    """
    Parse the entire subtitle file, generating a mapping
    of character data to Character models

    When a speaker isn't found for a line, it's stored
    under the name '__UNKNOWN__'

    This information is meant to be saved via the
    database session afterwards. Dialogue info
    is saved under `character.dialogues`
    Args:
        sub: Valid subtitle file loaded from pysub2
            missing because it might be an OVA or a movie
        episode_id:
    Returns:
        tuple
        1) dictionary of all present character names
        mapped to a character object
        {
            [character name]: Character
        }
        2) Dialogues in chronological order
    """

    def parser(coll: ParsedSubs, line: pysubs2.SSAEvent) -> ParsedSubs:

        if not line.text:
            return coll

        current_dialogue, characters = coll

        name = line.name if line.name else '__UNKNOWN__'

        if name not in characters:
            result = session.query(Character, anime_appearances) \
                .filter(
                Character.raw_name == name and anime_appearances.anime_id == anime_id
            ).first()

            if result:
                character = result[0]
                characters[name] = character
            else:
                character = Character()
                character.raw_name = name
                character.id = uuid4()
                characters[name] = character

        dialogue = Dialogue()

        dialogue.id = uuid4()
        dialogue.order = current_dialogue

        dialogue.character_id = characters[name]
        dialogue.start = line.start
        dialogue.end = line.end
        dialogue.anime_id = anime_id
        dialogue.text = line.plaintext
        dialogue.episode_id = episode_id

        characters[name].dialogues.append(dialogue)

        current_dialogue += 1

        return current_dialogue, characters

    logging.info(f'Parsing subtitles for {sub}')

    initial = (0, {})

    # TODO: this is pretty disgusting, change it
    _, out = reduce(parser, sub, initial)

    chars = list(out.values())

    logging.debug(f'Found {len(chars)} characters in {sub}')

    return chars


def clean_text(text: str) -> str:
    """
    Cleaning the control characters
    that are found in some of the subtitles
    Args:
        text: a line from a subtitle
    Returns:
        str - cleaned text
    """
    clean = re.sub(CONTROL_CHARACTER_REGEX, '', text)
    return clean.replace('\\N', '')


def sub_length(sub: pysubs2.SSAFile) -> int:
    return max(*[line.end for line in sub])
