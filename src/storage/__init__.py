CACHE_EXPIRE_TIME = 60 * 60 * 24 * 2

MISSING_REDIS_WARNING = """
FATAL: 'REDIS_URL' environment variable is not set up, quitting...
This worker performs multiple queries per season
with a lot of the queries being similar for each episode.
In order to avoid being rate limited by MAL and AniList
it is required to have some form of caching available.
If you have redis, just set a connection URL to the REDIS_URL env variable.
If you do not have redis you can download it here (https://redis.io/download)
"""
