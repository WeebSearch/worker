import * as bcrypt from "bcryptjs";
import { AuthResponse, LoginCredentials } from "../interfaces/query";
import { Context, signJwt } from "../utils";

export const dialogueQuery = {
  async dialogues(
    _,
    { search, anime }: { search: string; anime: string },
    ctx: Context,
    info
  ) {
    // this
    const dialogue = await ctx.db.query.dialogues(
      {
        where: {
          character: {
            OR: [
              {
                rawName_contains: search
              },
              {
                name_contains: search
              }
            ]
          },
          anime: {
            OR: []
          }
        },
        orderBy: "order_ASC",
        first: 100
      },
      info
    );
    return dialogue;
  }
};
