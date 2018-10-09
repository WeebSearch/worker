import * as bcrypt from "bcryptjs";
import { AuthResponse, LoginCredentials } from "../interfaces/query";
import { Context, signJwt } from "../utils";

export const animeQuery = {
  async animes(
    _,
    { search, anime }: { search: string; anime: string },
    ctx: Context,
    info
  ) {
    // this
    const dialogue = await ctx.db.query.animes(
      {
        where: {
          OR: [
            {
              rawName_contains: search
            },
            {
              name_contains: search
            }
          ],
        },
        orderBy: "name_ASC",
        first: 100
      },
      info
    );
    return dialogue;
  },
  async anime(
    _,
    { name }: { name: string },
    ctx: Context,
    info
  ) {
    // this
    console.log('=============================')
    console.log(name)
    const dialogue = await ctx.db.query.anime(
      {
        where: {
          rawName: name
        },
      },
      info
    );
    return dialogue;
  }
}
