from typing import Optional, List

from api.schema.character import Character


class Episode:
    anime_id: str
    episodeNumber: Optional[str]
    length: int
    subGroup: str
    language: Optional[str]
    season_id: Optional[str]
    characters: List[Character]

