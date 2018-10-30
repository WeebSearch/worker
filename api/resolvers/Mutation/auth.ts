import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { promisify } from "util";
import { AuthResponse, LoginCredentials } from "../../interfaces/query";
import { Context, signJwt } from "../../utils";


export const authMutation = {
  async signUp(
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

    const { token } = await signJwt({ id });
    return {
      token,
      successful: true
    };
  },
  async signIn(
    parent,
    { email, password }: LoginCredentials,
    ctx: Context
  ): Promise<AuthResponse> {
    const client = await ctx.db.query.user({
      where: { email }
    });

    if (!client) {
      // We don't want to give tips on wrong username/password
      return { successful: false };
    }


    // noinspection TsLint
    ctx.request.session.userId = client.id;
    console.log(ctx.request.session);

    const hash = await bcrypt.hash(password, client.salt);
    const authorized = hash === client.hash;

    if (!authorized) {
      return { successful: false };
    }

    const { token } = await signJwt({ userId: client.id });

    return {
      token,
      successful: true
    };
  },
  // API authentication
  async auth(
    parent,
    { token }: { readonly token: string },
    ctx: Context
  ): Promise<AuthResponse> {
    try {
      const payload = await jwt.verify(token, process.env.JWT_SECRET);

      const { userId: id } = payload as { readonly userId: string };

      // noinspection TsLint
      ctx.request.session.userId = id;

      const client = await ctx.db.query.user({
        where: { id }
      });

      if (!client) {
        return { successful: false };
      }

      return {
        successful: true
      };
    } catch (e) {
      console.error(e);
      return { successful: false };
    }
  },
  async logout(
    parent,
    {},
    ctx: Context
  ): Promise<AuthResponse> {
    // @ts-ignore
    return new Promise((resolve, reject) => {
      if (!ctx.request.session.userId) {
        return resolve({ successful: false });
      }
      // const destroySessionAsync = promisify(ctx.request.destroy)
      // const result = await destroySessionAsync();
      ctx.request.session.destroy((err) => {
        // if (err) {
        //   return resolve({ successful: false });
        // }
        return resolve({ successful: true });
      });
    });
  }
};
