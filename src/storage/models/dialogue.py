from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from storage.database import Base


class Dialogue(Base):
    __tablename__ = 'dialogues'

    id = Column(UUID(as_uuid=True), primary_key=True)

    # Order of the conversation, ascending but not per row
    # so this is calculated within the parse
    order = Column(Integer, nullable=False)

    # the speaker always has an id, but not always a name
    # If this information isn't known, everything in the
    # anime will be assigned to one single character
    character_id = Column(
        UUID(as_uuid=True),
        ForeignKey('characters.id'),
        nullable=False,
    )

    episode_id = Column(UUID(as_uuid=True), ForeignKey('episodes.id'), nullable=False)

    # Season might be empty for things like movies
    season_id = Column(UUID(as_uuid=True), ForeignKey('seasons.id'), nullable=True)

    anime_id = Column(UUID(as_uuid=True), ForeignKey('animes.id'), nullable=False)

    # Timestamps of speech dates
    start = Column(Integer, nullable=False)
    end = Column(Integer, nullable=True)

    text = Column(String, nullable=True)

    episode = relationship('Episode', back_populates='dialogues')
    anime = relationship('Anime', back_populates='dialogues')
    season = relationship('Season', back_populates='dialogues')
    character = relationship('Character', back_populates='dialogues')
