from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from storage.database import Base

from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.sql import func


class File(Base):
    __tablename__ = 'files'

    id = Column(UUID(as_uuid=True), primary_key=True)

    anime_id = Column(
        UUID(as_uuid=True),
        ForeignKey(
            'animes.id', ondelete='CASCADE'
        )
    )

    archive_id = Column(
        UUID(as_uuid=True),
        ForeignKey(
            'archives.id', ondelete='CASCADE'
        )
    )

    # nullable because not everything's download date
    # is known
    link_url = Column(String, nullable=True)

    date = Column(DateTime, server_default=func.now())

    file_name = Column(String, nullable=False)

    anime = relationship('Anime')

    archive = relationship('Archive', back_populates='files')

    episode = relationship('Episode', back_populates='file')
