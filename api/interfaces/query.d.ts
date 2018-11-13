import { DateTime } from "../generated/prisma";

export interface JwtResponse {
  readonly token: string;
  readonly exp: number;
}

export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
}

export interface SignupCredentials extends LoginCredentials {
  readonly name: string;
}

export interface AuthResponse {
  readonly profile?: {
    readonly name: string;
    readonly createdAt: DateTime;
    readonly anilistName?: string;
    readonly email: string;
    readonly malName?: string;
    readonly profilePicture?: string;
  };
  readonly successful: boolean;
  readonly token?: string;
}

