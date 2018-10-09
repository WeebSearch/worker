import * as jwt from "jsonwebtoken";
import { AuthError, Context } from "../utils";

const isValidAuthHeader = (parts: string[]) => parts.length === 2 && parts[0] === 'Bearer';

export const isUserLoggedIn = (ctx: Context) => ctx.request.session && Boolean(ctx.request.session.userId)

const hasValidJWT = (ctx: Context):boolean => {
  const authHeader: string | undefined = ctx.request.get('Authorization');

  if (!authHeader) {
    return false;
  }

  const parts = authHeader.split(' ')

  if (!isValidAuthHeader(parts)) {
    return false;
  }

  const token = parts.pop();

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // TODO: Handle sessions manually here
    // ctx.session.touch();
    return Boolean(verified)
  } catch (e) {
    return false;
  }
}

export const isUserAuthorized = async (resolve, parent, args, ctx: Context): Promise<boolean> => {
  if (!isUserLoggedIn(ctx) && !hasValidJWT(ctx)) {
    throw new AuthError();
  }
  return resolve();
}

export const isOwner = async (resolve, parent, args, ctx) => {
  return false;
  // const permit = ctx.request.get("Authorization") === process.env.SUPER_SECRET;
  //
  // if (!permit) {
  //   throw new Error("Unauthorized");
  // }
  //
  // return resolve();
};
