import * as fs from "fs";
import { GraphQLClient } from "graphql-request";
import * as path from "path";
import * as R from "ramda";
import { promisify } from "util";
import { query } from "winston";
import { AnilistCharacterResponse } from "../typings/http";
import { logger } from "../tools/logging";

export const client = new GraphQLClient("http://localhost:4466", {
  headers: {
    Authorization: `Bearer ${process.env.PRISMA_SECRET}`
  }
});

export const anilist = new GraphQLClient("https://graphql.anilist.co");


const QUERY_LOCATION = path.join("typescript-worker", "queries");

const readFileAsync = promisify(fs.readFile);

const joinQueryLocation = (location: string) =>
  path.join(QUERY_LOCATION, location + ".graphql");

export const getQuery = (location: string) =>
  readFileAsync(joinQueryLocation(location)).then(R.toString);


// export const query = (q: string, variables: object) => client.request;

// const malClient = new GraphQLClient();

// export const fetchResponse = <T, K>(traverse: (_:T) => K, res: T) => {
//   if
// }

