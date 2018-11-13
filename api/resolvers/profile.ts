import { Context } from "../utils";

export const profileQueries = {
  async profile(
    _,
    {},
    ctx: Context,
    info
  ) {
    const user = await ctx.db.query.user({
      where: { id: ctx.request.id }
    });

    const { name, anilistName, email, malName, profilePicture } = user;
    console.log(user);
    return {
      name,
      anilistName,
      email,
      malName,
      profilePicture
    }
  }
};
