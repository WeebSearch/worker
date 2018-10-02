import * as jwt from "jsonwebtoken";
import { Prisma } from "./generated/prisma";
import { JwtResponse } from "./interfaces/query";

export interface Context {
  db: Prisma;
  request: any;
}

export function getUserId(ctx: Context) {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
      userId: string;
    };
    return userId;
  }

  throw new AuthError();
}

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

export const signJwt = async (payload: Object): Promise<JwtResponse> => {
  const expiry = process.env.TOKEN_EXPIRE || "10d";
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiry
  });
  const { exp } = await jwt.decode(token) as { exp: number };
  return { token, exp };
};
