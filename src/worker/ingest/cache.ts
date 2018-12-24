import { Map } from "immutable";
import * as _redis from "redis";
import { promisify } from "util";
import { logger } from "../tools/logging";

const redis: _redis.RedisClient =
  process.env.TEST ? null : _redis.createClient();

const REDIS_CACHE_PREFIX = "cache";
/**
 * Redis cache expiration time in seconds
 * 2 weeks
 */
const REDIS_KEY_LIFETIME = 60 * 60 * 24 * 14;
const getAsync = process.env.TEST ? null : promisify(redis.get).bind(redis);
const setAsync = process.env.TEST ? null : promisify(redis.set).bind(redis);
const expireAsync = process.env.TEST ? null : promisify(redis.expire).bind(redis);

/**
 * Wrapper function for memoizing other functions through redis
 * saving the stringified version of the first argument as the key.
 * Should generally not be used with functions that take objects as params
 * as the memoization will be slower due to the key size
 *
 * 1st wrapper - wrapper name
 * 2nd wrapper - function to memoize
 * 3rd wrapper - wrapped function
 *
 * @param name - name of the wrapper function, used to reduce the cache
 * collisions between different functions, should they be called with
 * the same args
 * @param f - function to wrap
 */
export const redisMemoize = (name: string, f: (..._: any[]) => any) => async (...args) => {
  // Don't want to throw errors in test mode
  if (process.env.TEST) {
    return f(...args);
  }
  const [arg] = args;
  const argTarget = [REDIS_CACHE_PREFIX, name, JSON.stringify(arg)].join(":");
  const cached = await getAsync(argTarget);
  if (cached) {
    // cached here is the right value here
    try {

      return JSON.parse(cached);
    } catch (e) {
      logger.error("Attempted to parse malformed JSON from redis");
      logger.debug(cached);
      // return cached;
    }
  }
  const result = await f(...args);
  if ([undefined, null].some(e => result === e)) {
    // don't memoize undefined stuff
    return result;
  }
  await setAsync(argTarget, JSON.stringify(result));
  await expireAsync(argTarget, REDIS_KEY_LIFETIME);
  return result;
};
