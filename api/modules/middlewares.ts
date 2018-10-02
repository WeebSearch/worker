import { Context } from "../utils";
import { isOwner } from "./auth";
import { checkLimited, rateLimit } from "./ratelimit";

export const auth = {
  //   Query: {
  //     example: isLoggedIn
  //   }
  //   Mutation: {
  //     createUser: isOwner
  //   }
};

export const permissions = async (resolve, root, name, ctx: Context, info) => {
  const user = ctx.db.query.user({
    where: {}
  });
};

export const rateLimiting = async (resolve, root, args, ctx: Context, info) => {
  const ip: string = ctx.request.ip;
  const rateLimited: boolean = await checkLimited(ip);

  // if (rateLimited) {
  //   throw new Error("You are sending requests too quickly");
  // }

  await rateLimit(ip, 1);
  return resolve();
};
