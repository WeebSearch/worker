import { isLoggedIn, isOwner } from "../modules/auth";
import { authQuery } from "./auth";
import { authMutation } from "./Mutation/auth";

export const resolvers = {
  Query: {
    ...authQuery
  },
  Mutation: {
    ...authMutation
  }
};
