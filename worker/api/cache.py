import redis


def setup_redis():
    return redis.StrictRedis(
        host='localhost',
        port=6379,
        charset='utf-8',
        decode_responses=False
    )


cache = setup_redis()
