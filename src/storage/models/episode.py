from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from storage.database import Base
from storage.models.character import episode_appearances


class Episode(Base):
    __tablename__ = 'episodes'

    id = Column(UUID(as_uuid=True), primary_key=True)
    anime_id = Column(UUID(as_uuid=True), ForeignKey('animes.id'))

    season_id = Column(UUID(as_uuid=True), ForeignKey('seasons.id'), nullable=True)

    # file download
    download_id = Column(UUID(as_uuid=True), ForeignKey('downloads.id'), nullable=True)

    # episode numbers aren't always integers
    # Example: OVA, SP1 etc...
    episode_number = Column(String)
    length = Column(Integer)

    sub_group = Column(String, default='__UNKNOWN__')

    # 2 letter country code [EN, JP]
    language = Column(String, default='EN')

    characters = relationship('Character', secondary=episode_appearances, back_populates='episodes')

    dialogues = relationship('Dialogue', back_populates='episode')

    anime = relationship('Anime', back_populates='episodes')

    season = relationship('Season', back_populates='episodes')

    download = relationship('Download', back_populates='episodes')
