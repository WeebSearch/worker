import * as Fuse from "fuse.js";
import { GraphQLClient } from "graphql-request";
import * as R from "ramda";
import { redisMemoize } from "../ingest/cache";
import { getQuery, logDbError } from "../queries";
import { FuseMatch } from "../typings/ass-parser";
import { AnilistCharacter, AnilistCharacterResponse } from "../typings/http";

const ANILIST_ENDPOINT = "https://graphql.anilist.co";

const anilist = new GraphQLClient(ANILIST_ENDPOINT);

export const fetchCharacters: (_: number | string) => Promise<AnilistCharacterResponse | undefined> =
  redisMemoize("fetchCharacters", async (id: string | number) => {
    const q = await getQuery("fetchCharactersByMalId");
    return anilist.request(q, { id })
      .catch(logDbError(`Error fetching character ${id} from anilist`));
  });

export const matchCharacters = (pool: AnilistCharacter[], characterNames: string[]) => {
  const keys = ["name.first", "name.last", "name.native"];
  // @ts-ignore
  const fuzzyNames = new Fuse(pool, { keys });
  const matchFuzz = R.curry(matchCharacter)(fuzzyNames);
  return characterNames.map(matchFuzz);
};

export const matchCharacter = <T>(pool: Fuse<T>, characterName: string): FuseMatch<T> => {
    const [hit] = pool.search(characterName);
    return [characterName, hit];
  };

