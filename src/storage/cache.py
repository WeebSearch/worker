import redis
import os

from storage import MISSING_REDIS_WARNING


def setup_redis():

    return redis.StrictRedis(
        host='localhost',
        port=6379,
        charset='utf-8',
        decode_responses=False
    )


cache = setup_redis()
