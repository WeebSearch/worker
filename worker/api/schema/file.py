from typing import Optional

from api.schema.episode import Episode


class File:
    anime_id: str
    fileName: str
    linkUrl: Optional[str]
    episode_id: str
    archive_id: Optional[str]
    episode: Episode
