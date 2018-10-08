import { isLoggedIn, isOwner } from "../modules/auth";
import { authQuery } from "./auth";
import { dialogueQuery } from "./dialogue";
import { authMutation } from "./Mutation/auth";

export const resolvers = {
  Query: {
    ...authQuery,
    ...dialogueQuery
  },
  Mutation: {
    ...authMutation
  }
};
