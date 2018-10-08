import { isLoggedIn, isOwner } from "../modules/auth";
import { dialogueQuery } from "./dialogue";
import { authMutation } from "./Mutation/auth";

export const resolvers = {
  Query: {
    ...dialogueQuery
  },
  Mutation: {
    ...authMutation
  }
};
