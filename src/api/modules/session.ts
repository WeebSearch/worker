import * as redisSession from "connect-redis";
import * as jwt from "express-jwt";
import * as session from "express-session";
import { cache as client } from "./cache";

const RedisStore = redisSession(session);

export const tokens = jwt({
  secret: process.env.SESSION_SECRET
});

export const sess = session({
  store: new RedisStore({ client }),
  name: "wsid",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
});
