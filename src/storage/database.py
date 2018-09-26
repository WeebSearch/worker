from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


Base = declarative_base()

url = 'postgresql://python-ingest-worker:test@/anime_index'

engine = create_engine(url)
Session = sessionmaker(bind=engine)

Base.metadata.bind = engine
Base.metadata.create_all(engine)

conn = engine.connect()

session = Session(bind=conn, autoflush=False, autocommit=False)
