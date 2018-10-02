from ingest.file.system import glob, is_valid_sub

from rarfile import RarFile
from typing import List
from pathlib import Path

import os
import logging

logger = logging.getLogger(__name__)

VALID_ARCHIVES = [
    '.rar'
]


def is_archive(path: Path) -> bool:
    return path.suffix in VALID_ARCHIVES


# TODO: make this a generic extract that works for all file types

def extract(path: Path, delete=False) -> List[Path]:
    """
    Extracts a single .rar file (yes, rar file, go
    shout at the person offering the subtitle service)

    The contents are NOT unpacked directly onto the archive
    directory, rather, another subdirectory is created with
    the same name that has all the archive contents

    Args:
        path: relative location of the archive
        delete: (optional:False) delete archive after?
    Returns:
        List[str] - list of ALL the paths of subtitle
        files found inside the extracted file that
        matches the HorribleSubs pattern
    Notes:
        Currently, the function assumes that the file type
        is .rar
    """

    logger.debug(f'Extracting archive located at {path.name}')

    rar_file_path = str(path.absolute())
    logger.info(f'Path to file to extract "{rar_file_path}"')

    target = RarFile(rar_file_path)
    name = path.stem

    extract_location = Path('downloads').joinpath(name)

    # creates a new folder with the exact same name
    # in the download location
    target.extractall('downloads')
    # fetches all HorribleSubs files
    sub_locations = glob(extract_location, f_filter=is_valid_sub)

    logger.debug('Extracted files at locations:')
    logger.debug(sub_locations)

    if delete:
        os.remove(str(path))
        logger.info(f'Deleted archive at {path.name} after being processed')

    return sub_locations
