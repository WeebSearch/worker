import redis
import os 
import logging

logger = logging.getLogger(__name__)

def setup_redis():
    if os.getenv('PYTHON_ENV', 'DEBUG') == 'DEBUG':
        logger.warning('Python is running in debug mode, Redis is disabled')
        return None

    return redis.StrictRedis(
        host='localhost',
        port=6379,
        charset='utf-8',
        decode_responses=False
    )


cache = setup_redis()
