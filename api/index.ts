import * as dotenv from "dotenv";
dotenv.config();

import { GraphQLServer } from "graphql-yoga";
import * as helmet from "helmet";
import { Prisma } from "./generated/prisma";
import { auth, limitRedis } from "./modules/middlewares";
import { sess } from "./modules/session";
import { resolvers } from "./resolvers";

const server = new GraphQLServer({
  context: req => ({
    ...req,
    db: new Prisma({
      debug: true, // log all GraphQL queries & mutations sent to the Prisma API
      endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma API (value set in `.env`)
      secret: process.env.PRISMA_SECRET, // only needed if specified in `database/prisma.yml` (value set in `.env`)
    })
  }),
  resolvers,
  middlewares: [auth],
  typeDefs: "./api/schema.graphql"
});

server.express.use(sess);
server.express.use(limitRedis);
server.express.use(helmet());

const cors = {
  credentials: true,
  origin: "http://localhost:4200"
};
console.log(process.env.SESSION_SECRET)
server.start({ cors }, () => console.log(`Server is running on http://localhost:4000`));
