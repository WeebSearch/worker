import * as jwt from "jsonwebtoken";
import { Prisma } from "./generated/prisma";
import { JwtResponse } from "./interfaces/query";

export interface UserSession {
    userId?: string;
}

export interface Context {
  db: Prisma;
  request: any & Express.Session & UserSession;
}

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

export const signJwt = async (payload: object): Promise<JwtResponse> => {
  const expiry = process.env.TOKEN_EXPIRE || "10d";
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiry
  });
  const { exp } = await jwt.decode(token) as { exp: number };
  return { token, exp };
};
