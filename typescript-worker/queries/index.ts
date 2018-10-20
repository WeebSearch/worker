import * as fs from "fs";
import { GraphQLClient } from "graphql-request";
import * as path from 'path';
import * as R from 'ramda';
import { promisify } from "util";

const QUERY_LOCATION = path.join('typescript-worker', 'queries');

const readFileAsync = promisify(fs.readFile);

const joinQueryLocation = (location: string) =>
  path.join(QUERY_LOCATION, location + '.graphql');

export const getQuery = (location: string) =>
  readFileAsync(joinQueryLocation(location)).then(R.toString);


// const malClient = new GraphQLClient();
