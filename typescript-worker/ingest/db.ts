import { GraphQLClient } from "graphql-request";
import * as R from "ramda";
import { AnimeCreateInput, ArchiveCreateInput } from "../../api/generated/prisma";
import { getQuery, logDbError } from "../queries";
import { logger } from "../tools/logging";

const DATABASE_ENDPOINT = process.env.PRISMA_ENDPOINT;
const client = new GraphQLClient(DATABASE_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.PRISMA_SECRET}`
  }
});

/**
 * Creates an anime
 * @param params
 */
export const createAnime = (params:AnimeCreateInput): Promise<any | undefined> =>
  getQuery("createAnime")
    .then(q => client.request(q, params))
    .catch(logDbError(`Could not commit anime ${params.rawName} to db`));

export const createArchive = (params: ArchiveCreateInput): Promise<|undefined> =>
  getQuery("createArchive")
    .then(q => client.request(q, params))
    .catch(logDbError(`Could not commit archive ${params.fileName} to db`));
