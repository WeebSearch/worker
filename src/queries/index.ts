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

const QUERY_LOCATION = path.join("src", "worker", "queries");

const readFileAsync = promisify(fs.readFile);

const joinQueryLocation = (location: string) =>
  path.join(QUERY_LOCATION, location + ".graphql");

const is404 = (message: string) => message.includes('Not Found');

export const getQuery = (location: string) =>
  readFileAsync(joinQueryLocation(location)).then(R.toString);

const handleErrors = R.cond([
  [error => error.message && isDuplicateError(error.message), (error) => {
    const [err] = error.response.errors;
    logger.warn(`Attempted to save duplicate copy of item from ${err.path}`);
    logger.debug(JSON.stringify(error.request.variables, null, 2));
  }],
  [R.prop('message'), error => {
    const [err] = error.response.errors;
    logger.warn(`Attempted to save duplicate copy of item from ${err.path}`);
    logger.debug(JSON.stringify(error.request.variables, null, 2));
  }],
  [is404, error => {
    logger.warn(`Got 404 for request with vars ${error.variables}`);
  }],
  [R.T, error => {
    console.log(error.response.errors.slice(0, 5));
    logger.debug(error);
  }]
]);


export const logDbError = (message, options?) => error => {
  handleErrors(error);
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

