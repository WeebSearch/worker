import json

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import requests
import logging

logger = logging.getLogger(__name__)


if not DATABASE_URL:
    logger.error('DATABASE_URL was not found ')


def query(query_body: str, variables: dict) -> requests.Response:
    data = {
        'query': query_body,
        'variables': variables
    }

    data = json.dumps(data)
    return requests.post(DATABASE_URL, json=data)


Base = declarative_base()

url = 'postgresql://python-ingest-worker:test@/anime_index'

engine = create_engine(url)
Session = sessionmaker(bind=engine)

Base.metadata.bind = engine
Base.metadata.create_all(engine)

conn = engine.connect()

session = Session(bind=conn, autoflush=False, autocommit=False)
