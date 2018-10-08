import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import {AuthResponse, LoginCredentials} from "../interfaces/query";
import {Context, signJwt} from "../utils";

export const authQuery = {
  async signIn(
    parent,
    {email, password}: LoginCredentials,
    ctx: Context
  ): Promise<AuthResponse> {
    const client = await ctx.db.query.user({
      where: {email}
    });
    console.log(client);

    if (!client) {
      // We don't want to give tips on wrong username/password
      return {successful: false}
    }

    const hash = await bcrypt.hash(password, client.salt);
    const authorized = hash === client.hash;

    if (!authorized) {
      return {successful: false}
    }

    const {token} = await signJwt({userId: client.id});

    return {
      token,
      successful: true
    };
  },
  async auth(
    parent,
    {token}: { token: string },
    ctx: Context
  ): Promise<AuthResponse> {
    let payload;

    try {
      payload = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      console.error(e);
      return {successful: false}
    }

    const {userId: id} = payload;

    ctx.request.session.userId = id;

    const client = await ctx.db.query.user({
      where: {id}
    });

    if (!client) {
      return {successful: false}
    }

    return {
      successful: true,
    };
  }
};
