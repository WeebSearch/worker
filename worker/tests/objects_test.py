from pathlib import Path

from ingest.subs import load_subs

import pytest


@pytest.mark.skip()
def get_valid_sub():
    return load_subs(Path('resources/test_valid_subs.ass'))


@pytest.mark.skip()
def get_invalid_sub():
    return load_subs(Path('resources/test_invalid_subs.ass'))
