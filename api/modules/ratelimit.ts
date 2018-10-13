import * as RateLimiter from 'express-rate-limit'
import * as RedisStore from 'rate-limit-redis'
import { cache } from "./cache";

export const limitRedis = new RateLimiter({
  store: new RedisStore({ client: cache }),
  max: 22,
  windowMs: 1000 * 60 * 15,
  handler: (req, res, next) => {
    const payload = {
      message: "You're sending requests too quickly."
    }
    res.status(429).send(JSON.stringify(payload))
  }
})

export const checkLimited = (key: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    cache.exists(key, (err, cb) => {
      if (err) {
        return reject(err);
      }
      return resolve(Boolean(cb));
    });
  });

export const rateLimit = (key: string, seconds: number = 1): Promise<void> =>
  new Promise((resolve, reject) => {
    cache.set(key, "1", (err, _) => {
      if (err) {
        return reject(err);
      }
      // tslint:disable-next-line:no-shadowed-variable
      cache.expire(key, seconds, (err, _) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  });
