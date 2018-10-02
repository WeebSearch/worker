from typing import Optional


class Character:
    anilistId: int
    rawName: str
    name: Optional[str]
    certainty: int
    thumbnailUrl: Optional[str]
    episode_id: str
    anime_id: str
