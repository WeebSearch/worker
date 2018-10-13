import { Context } from "../utils";

interface DialoguesQueryInput {
  search: string;
  episodeId: string;
  episodeName: string;
}

export const dialogueQuery = {
  async dialogues(
    _,
    { search, episodeId, episodeName }: DialoguesQueryInput,
    ctx: Context,
    info
  ) {
    // this
    let query;

    if (episodeId) {
      query = { episode: { id: episodeId } }
    } else if (episodeName) {
      query = { anime: { rawName: episodeName } }
    } else if (search) {
      // TODO: change this to solr searching
      query = { character: {
        OR: [
          {
            rawName_contains: search
          },
          {
            name_contains: search
          }
        ]
      }}
    }
    else {
      throw new Error('No valid input given')
    }
    const dialogue = await ctx.db.query.dialogues(
      {
        where: {
          ...query
        },
        orderBy: "order_ASC",
        // first: 100
      },
      info
    );
    return dialogue;
  }
}
