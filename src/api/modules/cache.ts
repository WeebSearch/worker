import * as redis from "redis";

export const cache = redis.createClient();
