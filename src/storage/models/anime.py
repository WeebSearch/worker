from sqlalchemy import Column, String, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from storage.database import Base
from storage.models.character import anime_appearances


class Anime(Base):
    __tablename__ = 'animes'

    id = Column(UUID(as_uuid=True), primary_key=True)

    anilist_id = Column(Integer, nullable=True)
    mal_id = Column(Integer, nullable=True)

    raw_name = Column(String, nullable=False)
    name = Column(String, nullable=True)

    thumbnail_url = Column(String, nullable=True)

    # main relationships
    characters = relationship(
        'Character',
        back_populates='animes',
        secondary=anime_appearances,
        cascade='all, delete-orphan',
        single_parent=True
    )

    episodes = relationship(
        'Episode',
        back_populates='anime',
        cascade='all, delete-orphan',
        single_parent=True
    )

    dialogues = relationship(
        'Dialogue',
        back_populates='anime',
        cascade='all, delete-orphan',
        single_parent=True
    )

    seasons = relationship(
        'Season',
        back_populates='anime',
        cascade='all, delete-orphan',
        single_parent=True
    )

    files = relationship(
        'File',
        back_populates='anime',
        cascade='all, delete-orphan',
        single_parent=True,
    )

    def __repr__(self):
        return self.raw_name
