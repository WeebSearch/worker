import * as Fuse from "fuse.js";
import { GraphQLClient } from "graphql-request";
import * as R from "ramda";
import { redisMemoize } from "../ingest/cache";
import { getQuery } from "../queries";
import { FuseMatch, FuseResult } from "../typings/ass-parser";
import { AnilistCharacter, AnilistCharacterResponse } from "../typings/http";

const ANILIST_ENDPOINT = "https://graphql.anilist.co";

const CHARACTER_SIMILARITY_THRESHOLD = 60;

const anilist = new GraphQLClient(ANILIST_ENDPOINT);


export const fetchCharacters: (_: number | string) => Promise<AnilistCharacterResponse | undefined> =
  redisMemoize("fetchCharacters", async (id: string | number) => {
    const q = await getQuery("fetchCharactersByMalId");
    return anilist.request(q, { id })
      .catch(() => ({}));
      // .catch(logDbError(`Error fetching character ${id} from anilist`));
  });

export const matchCharacters =
  (pool: AnilistCharacter[], characterNames: string[]): Array<FuseMatch<AnilistCharacter>> => {
    const keys = ["name.first", "name.last", "name.native"];
    const fuzzyNames = new Fuse(pool || [{}], {
      // @ts-ignore
      keys,
      includeScore: true,
      shouldSort: true,
      threshold: CHARACTER_SIMILARITY_THRESHOLD // for some reason lower is better
    });
    try {
      const matchFuzz = R.curry(matchCharacter)(fuzzyNames);
      return characterNames.map(matchFuzz);
    } catch (e) {
      console.log(e)
    }
  };

export const matchCharacter = <T>(pool: Fuse<AnilistCharacter>, characterName: string): FuseMatch<AnilistCharacter> => {
  // @ts-ignore
  const hit: FuseResult<AnilistCharacter> = pool.search(characterName).shift();
  return [characterName, hit && {
    ...hit,
    score: 1 - hit.score
  }];
};

export const safeJoinName = (...names: string[]) =>
  names.join(" ").trim();
