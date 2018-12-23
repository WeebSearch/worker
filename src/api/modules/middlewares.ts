import { Context } from "../utils";
import { isOwner, isUserAuthorized, isUserLoggedIn } from "./auth";
import { checkLimited, rateLimit } from "./ratelimit";
export { limitRedis } from "./ratelimit";

/**
 * Checks authorization for
 * @param resolve
 * @param root
 * @param name
 * @param ctx
 * @param info
 */
export const authorization = async (resolve, root, name, ctx: Context, info) => {
  if(!isUserLoggedIn(ctx)) {
    return;
  }
  return resolve();
};

/**
 * Rate limiting spammy requests
 * @param resolve
 * @param root
 * @param args
 * @param ctx
 * @param info
 */
export const rateLimiting = async (resolve, root, args, ctx: Context, info) => {
  const ip: string = ctx.request.ip;
  const rateLimited: boolean = await checkLimited(ip);

  // TODO: this doesn't play too nicely with graphql introspection
  // if (rateLimited) {
  //   throw new Error("You are sending requests too quickly");
  // }

  await rateLimit(ip, 1);
  return resolve();
};

export const auth = {
  Query: {
    // dialogues: isUserAuthorized,
    profile: isUserAuthorized
  }
};

