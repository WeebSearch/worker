import { Context } from "../../utils";

export const userMutation = {
  async createUser(_, args, ctx: Context, info) {
    return ctx.db.mutation.createUser({ data: args });
  }
};
