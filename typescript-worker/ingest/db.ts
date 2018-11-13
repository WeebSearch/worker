import { GraphQLClient } from "graphql-request";
import * as R from "ramda";
import {
  AnimeCreateInput,
  ArchiveCreateInput, CharacterCreateInput, CharacterUpdateInput,
  CharacterWhereUniqueInput,
  FileCreateInput
} from "../../api/generated/prisma";
import { getQuery, logDbError } from "../queries";
import { logger } from "../tools/logging";
import { UpsertCharacterInput } from "../typings/db";

const DATABASE_ENDPOINT = process.env.PRISMA_ENDPOINT;
const client = new GraphQLClient(DATABASE_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.DATABASE_TOKEN}`
  }
});

/**
 * Creates an anime
 * @param params
 */
export const createAnime = (params: AnimeCreateInput): Promise<any | undefined> =>
  getQuery("createAnime")
    .then(q => client.request(q, params))
    .then(res => {
      logger.info(`Created anime: ${params.rawName}`);
      return res;
    })
    .catch(logDbError(`Could not commit anime ${params.rawName} to db`));

export const createArchive = (params: ArchiveCreateInput): Promise<|undefined> =>
  getQuery("create_archive")
    .then(q => client.request(q, params))
    .then(res => {
      logger.info(`Created archive: ${params.fileName}`);
      return res;
    })
    .catch(logDbError(`Could not commit archive ${params.fileName} to db`));

export const createFile = (params: FileCreateInput) =>
  getQuery("create_file")
    .then(q => client.request(q, { file: params }))
    .then(res => {
      logger.info(`Created file: ${params.fileName}`);
      return res;
    })
    .catch(logDbError(`Could not commit file ${params.fileName} to db`));

export const upsertCharacter = (input: UpsertCharacterInput) => getQuery("upsert_character")
  .then(q => client.request(q, input))
  .then(res => {
    // @ts-ignore
    logger.info(`Upserted character: ${input.create.rawName}`);
    return res;
  })
  .catch(logDbError(`Could not commit character ${input.create.rawName} to db`));

export const getAnime = (rawName: string) => getQuery("find_anime")
  .then(q => client.request(q, { rawName }))
  .catch(logDbError(`Could not get Anime ${rawName}`));

export const getArchive = (rawName: string) => getQuery("find_archive")
  .then(q => client.request(q, { rawName }))
  .catch(logDbError(`Could not get Archive ${rawName}`));

export const getCharacter = (anilistId: number) => getQuery("find_character")
  .then(q => client.request(q, { anilistId }))
  .catch(logDbError(`Could not get Character ${anilistId}`));

export const getFile = (fileName: string) => getQuery("find_file")
  .then(q => client.request(q, { fileName }))
  .catch(logDbError(`Could not get File ${fileName}`));
