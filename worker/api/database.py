import json

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import requests
import logging

logger = logging.getLogger(__name__)

DATABASE_URL = os.getenv('PRISMA_ENDPOINT', 'http://localhost:4466')

if not DATABASE_URL:
    logger.error('DATABASE_URL was not found ')


def query(query_body: str, variables: dict) -> requests.Response:
    data = {
        'query': query_body,
        'variables': variables
    }

    data = json.dumps(data)
    return requests.post(DATABASE_URL, json=data)

session = None


