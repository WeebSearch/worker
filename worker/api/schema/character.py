from typing import Optional, List

from api.schema.dialogue import Dialogue


class Character:
    id: Optional[int]
    anilistId: int
    rawName: str
    name: Optional[str]
    certainty: int
    thumbnailUrl: Optional[str]
    dialogues: List[Dialogue] = []
    episode_id: str
    anime_id: str
