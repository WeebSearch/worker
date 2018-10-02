from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from api.database import Base
from api.schema.character import season_appearances


class Season(Base):
    __tablename__ = 'seasons'

    id = Column(UUID(as_uuid=True), primary_key=True)

    anime_id = Column(UUID(as_uuid=True), ForeignKey('animes.id'))

    # Raw pilot episode name, can't be the "name" section
    # of the regular expression because some subtitles
    # contain season information in the episode part
    raw_name = Column(String, nullable=False)

    name = Column(String, nullable=True)

    episodes = relationship('Episode', back_populates='season')

    characters = relationship(
        'Character',
        secondary=season_appearances,
        back_populates='seasons')

    dialogues = relationship('Dialogue', back_populates='season')

    anime = relationship('Anime', back_populates='seasons')
