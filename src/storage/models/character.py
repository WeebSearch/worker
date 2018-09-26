from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from storage.database import Base

from sqlalchemy import Column, String, ForeignKey, Integer, Table

# many - to - many relationships
anime_appearances = Table(
    'anime_appearances',
    Base.metadata,
    Column('character_id', UUID(as_uuid=True), ForeignKey('characters.id')),
    Column('anime_id', UUID(as_uuid=True), ForeignKey('animes.id'))
)

season_appearances = Table(
    'season_appearances',
    Base.metadata,
    Column('character_id', UUID(as_uuid=True), ForeignKey('characters.id')),
    Column('season_id', UUID(as_uuid=True), ForeignKey('seasons.id'))
)

episode_appearances = Table(
    'episode_appearances',
    Base.metadata,
    Column('character_id', UUID(as_uuid=True), ForeignKey('characters.id')),
    Column('episode_id', UUID(as_uuid=True), ForeignKey('episodes.id'))
)


class Character(Base):
    __tablename__ = 'characters'

    id = Column(UUID(as_uuid=True), primary_key=True)
    anilist_id = Column(Integer, nullable=True)

    raw_name = Column(String, default='__UNKNOWN__')
    name = Column(String, nullable=True)

    certainty = Column(Integer, nullable=True)

    thumbnail_url = Column(String, nullable=True)

    animes = relationship(
        'Anime',
        secondary=anime_appearances,
        back_populates='characters'
    )

    episodes = relationship(
        'Episode',
        back_populates='characters',
        secondary=episode_appearances
    )

    seasons = relationship(
        'Season',
        secondary=season_appearances,
        back_populates='characters'
    )

    dialogues = relationship('Dialogue', back_populates='character')
