import { Context } from "../utils";

export const episodesQuery = {
  async episodes(
    _,
    { animeId }: { animeId: string },
    ctx: Context,
    info
  ) {
    // this
    const dialogue = await ctx.db.query.episodes(
      {
        where: {
          anime: { id: animeId }
        },
        orderBy:  "episodeNumber_ASC",
        first: 100
      },
      info
    );
    return dialogue;
  },
  async episode(
    _,
    { episodeId: id }: { episodeId: string },
    ctx: Context,
    info
  ) {
    return ctx.db.query.episode(
      {
        where: {
          id
        },
      },
      info
    );
  }
}
