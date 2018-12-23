import { animeQuery } from "./anime";
import { dialogueQuery } from "./dialogue";
import { episodesQuery } from "./episodes";
import { authMutation } from "./Mutation/auth";
import { profileQueries } from "./profile";

export const resolvers = {
  Query: {
    ...animeQuery,
    ...episodesQuery,
    ...dialogueQuery,
    ...profileQueries
  },
  Mutation: {
    ...authMutation
  }
};
