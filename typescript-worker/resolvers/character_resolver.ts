import { GraphQLClient, request } from 'graphql-request';
import { getQuery } from "../queries";
import { logger } from "../tools/logging";
import { AnilistCharacterResponse } from "../typings/http";

const ANILIST_ENDPOINT = 'https://graphql.anilist.co';

const anilist = new GraphQLClient(ANILIST_ENDPOINT);

export const fetchCharacters = async (id: string | number) => {
  const q = await getQuery("fetchCharactersByMalId");
  return anilist.request<AnilistCharacterResponse>(q, { id })
    .catch((error) => {
      logger.error(`Error fetching character ${id} from anilist`);
      logger.debug(error);
    });
};


export const matchCharacter = (character: object, pool: object[]) => {

}
