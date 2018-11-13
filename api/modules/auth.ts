import * as jwt from "jsonwebtoken";
import { promisify } from "util";
import { AuthError, Context } from "../utils";

const jwtVerifyAsync = promisify(jwt.verify).bind(jwt);

export const isUserLoggedIn = (ctx: Context) => ctx.request.session && Boolean(ctx.request.session.userId);

export const isUserAuthorized = async (resolve, parent, args, ctx: Context): Promise<boolean> => {
  const authHeader: string | undefined = ctx.request.get("Authorization");

  if (!authHeader) {
    throw new AuthError();
  }

  const [header, token] = authHeader.split(" ");
  if (header !== "Bearer") {
    throw new AuthError();
  }

  try {
    const verified = await jwtVerifyAsync(token, process.env.JWT_SECRET);
    // TODO: Handle sessions manually here
    // ctx.session.touch();
    const { userId } = verified;
    // noinspection TsLint
    ctx.request.id = userId;
    return resolve();
  } catch (e) {
    throw new AuthError();
  }
};

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
