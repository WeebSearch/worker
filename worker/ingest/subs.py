from ingest.sub_groups import GENERIC_SUBS_PATTERN
from api.database import session
from api.schema.dialogue import Dialogue
from api.schema.character import Character, anime_appearances
from ingest.file.system import is_sub_file, extract_subtitle_info

import logging
from sqlalchemy.dialects.postgresql import UUID
from math import floor
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


def is_text_usable(unfiltered: str, filtered: str) -> bool:
    """
    Sometimes subtitle files have really weird
    control characters for stuff with no actual content.
    They usually appear before a subtitle file for no reason.

    for example:
        {=15}{\alpha&H00&\t(8550,9550,\alpha&HFF&)\fs66...

    When this percentage is big enough we consider that
    subtitle line to be unusable and is generally not
    even a part of the actual subtitles.

    Sometimes formatting is used to give emphasis to a
    specific word in a dialogue so we **don't** want to throw
    those away.

    Args:
        unfiltered: raw subtitle text
        filtered: subtitle text cleaned from control characters
    Returns:
        whether the text should be used or thrown away
    """
    f_length = len(filtered)
    unf_length = len(unfiltered)

    def limited_length():
        matches = re.findall(CONTROL_CHARACTER_REGEX, unfiltered)

        # control characters are generally used as
        # "Yeah, I {\i1}am{\i0} taller!"
        # none of those are longer than about 6 characters
        return all(map(lambda match: len(match) < 6, matches))

    checks = (
        # probably not a real dialogue at this point
        # you can't find that many chars on one scene
        unf_length < 200,
        not unfiltered.startswith('{='),
        unf_length < floor(f_length * 1.6),
        limited_length()
    )

    return all(checks)


def is_valid_line(line: pysubs2.SSAEvent) -> bool:
    """
    Checking whether the line is suitable
    to parse and commit to the database
    Args:
        line: pysubs2 line of a character
    """

    invalid_styles = [
        'Sign',
        'OP',
        'ED'
    ]

    invalid_speakers = [
        'on-screen'
    ]

    checks = (
        not line.is_comment,
        line.text,
        line.plaintext,
        line.name not in invalid_speakers,
        all(map(lambda i: i.lower() not in line.style, invalid_styles)),
        # at the end to allow short circuiting, it uses regex which is slow
        is_text_usable(line.text, line.plaintext)
    )

    return all(checks)


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


def parse_subtitles(sub: pysubs2.SSAFile, episode_id: UUID,
                    anime_id: UUID) -> List[Character]:
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

        if not is_valid_line(line):
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


def sub_length(sub: pysubs2.SSAFile) -> int:
    return max(*[line.end for line in sub])
