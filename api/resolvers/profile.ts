import { Context } from "../utils";

export const profileQueries = {
  async profile(
    _,
    {},
    ctx: Context,
    info
  ) {
    // this
    console.log(ctx.request)
    const id = ctx.request.session.userId
    const user = await ctx.db.query.user({
      where: { id }
    });

    const { name, anilistName, email, malName } = user;

    return {
      name,
      anilistName,
      email,
      malName
    }
  }
};
