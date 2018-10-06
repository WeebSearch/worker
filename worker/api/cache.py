import redis
import os
import logging

logger = logging.getLogger(__name__)


def setup_redis():
    if os.getenv('PYTHON_ENV') == 'TEST':
        logger.warning('Python is running in test mode, Redis is disabled')
        return

    return redis.StrictRedis(
        host='localhost',
        port=6379,
        charset='utf-8',
        # decode_responses=False
    )


cache = setup_redis()
