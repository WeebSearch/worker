import { GraphQLClient, request } from 'graphql-request';
import { getQuery } from "../queries";

const ANILIST_ENDPOINT = 'https://graphql.anilist.co';

const anilist = new GraphQLClient(ANILIST_ENDPOINT);

export const fetchCharactersByMalId = async (id: number) => {
  const query = await getQuery('fetchCharactersByMalId');
  return anilist.request(query, { id });
};
