import * as bcrypt from "bcryptjs";
import { AuthResponse, LoginCredentials } from "../interfaces/query";
import { Context, signJwt } from "../utils";

export const authQuery = {
  async auth(
    parent,
    { email, password }: LoginCredentials,
    ctx: Context
  ): Promise<AuthResponse> {
    const client = await ctx.db.query.user({
      where: { email }
    });
    console.log(client);

    if (!client) {
      // We don't want to give tips on wrong username/password
      throw new Error("Invalid credentials");
    }

    const hash = await bcrypt.hash(password, client.salt);
    const authorized = hash === client.hash;

    if (!authorized) {
      throw new Error("Invalid credentials");
    }

    const { token, exp: expiration } = await signJwt({ userId: client.id });

    return {
      token,
      expiration,
      email: client.email,
      name: client.name
    };
  }
};
