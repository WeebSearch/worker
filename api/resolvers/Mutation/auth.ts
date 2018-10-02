import * as bcrypt from "bcryptjs";
import { AuthResponse } from "../../interfaces/query";
import { Context, signJwt } from "../../utils";

export const authMutation = {
  async signup(
    parent,
    { email, password, name },
    ctx: Context
  ): Promise<AuthResponse> {
    const saltRounds = Number(process.env.SALT_ROUNDS || 8);
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const { id } = await ctx.db.mutation.createUser({
      data: {
        email,
        name,
        hash,
        salt
      }
    });

    const { token, exp: expiration } = await signJwt({ id });
    return {
      token,
      expiration,
      email,
      name
    };
  }
};
