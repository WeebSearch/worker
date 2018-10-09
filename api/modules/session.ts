import * as redisSession from 'connect-redis'
import * as session from "express-session";
import {cache as client} from "./cache";

const RedisStore = redisSession(session);
export const sess = session({
  store: new RedisStore({client}),
  name: "wsid",
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
});