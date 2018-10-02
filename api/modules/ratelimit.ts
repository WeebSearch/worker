import { cache } from "./cache";

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
