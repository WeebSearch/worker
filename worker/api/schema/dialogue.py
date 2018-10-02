from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from api.database import Base


class Dialogue(Base):
    order: int
    start: int
    end: int
    text: str

    episode_id: str
    animes_id: str


