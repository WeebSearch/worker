from pathlib import Path

from ingest.subs import load_subs

import pysubs2


def test_load():
    sub = load_subs(Path('resources/newgame.ass'))
    assert isinstance(sub, pysubs2.SSAFile)


def test_parse():
    pass
