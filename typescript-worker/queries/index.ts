import * as fs from "fs";
import { GraphQLError } from "graphql";
import { GraphQLClient } from "graphql-request";
import * as path from "path";
import * as R from "ramda";
import { promisify } from "util";
import { query } from "winston";
import { logger } from "../tools/logging";
import { AnilistCharacterResponse } from "../typings/http";

export const client = new GraphQLClient("http://localhost:4466", {
  headers: {
    Authorization: `Bearer ${process.env.PRISMA_SECRET}`
  }
});

const QUERY_LOCATION = path.join("typescript-worker", "queries");

const readFileAsync = promisify(fs.readFile);

const joinQueryLocation = (location: string) =>
  path.join(QUERY_LOCATION, location + ".graphql");

export const getQuery = (location: string) =>
  readFileAsync(joinQueryLocation(location)).then(R.toString);

export const logDbError = (message, options?) => error => {
  const [err] = error.response.errors;
  if (error.message && isDuplicateError(error.message)) {
    logger.warn(`Attempted to save duplicate copy of item from ${err.path}`);
    logger.debug(JSON.stringify(error.request.variables, null, 2));
  } else {
    logger.error(message);
    logger.debug(error);
  }
  if (options && options.passError) {
    return error;
  }
};

export const isDuplicateError = (error: string) =>
  error.includes("A unique constraint");

// export const handleError = (error: GraphQLError) => {
// };


// export const query = (q: string, variables: object) => client.request;

// const malClient = new GraphQLClient();

// export const fetchResponse = <T, K>(traverse: (_:T) => K, res: T) => {
//   if
// }

