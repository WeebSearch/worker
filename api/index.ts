import * as dotenv from "dotenv";
import { GraphQLServer } from "graphql-yoga";
import { Prisma } from "./generated/prisma";
import { auth, rateLimiting } from "./modules/middlewares";
import { resolvers } from "./resolvers/index";

dotenv.config();

const server = new GraphQLServer({
  context: req => ({
    ...req,
    db: new Prisma({
      debug: true, // log all GraphQL queries & mutations sent to the Prisma API
      endpoint: process.env.PRISMA_ENDPOINT // the endpoint of the Prisma API (value set in `.env`)
      // secret: process.env.PRISMA_SECRET, // only needed if specified in `database/prisma.yml` (value set in `.env`)
    })
  }),
  resolvers,
  middlewares: [rateLimiting, auth],
  typeDefs: "./src/schema.graphql"
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
