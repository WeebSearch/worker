from sqlalchemy.dialects.postgresql import UUID

from storage.database import Base

from sqlalchemy import Column, String, DateTime
from sqlalchemy.sql import func


class Archive(Base):
    __tablename__ = 'archives'

    id = Column(UUID(as_uuid=True), primary_key=True)

    # nullable because not everything's download date
    # is known
    link_url = Column(String, nullable=True)

    date = Column(DateTime, server_default=func.now())

    file_name = Column(String, nullable=False)
