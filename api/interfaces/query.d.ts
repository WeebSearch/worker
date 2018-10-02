export interface JwtResponse {
  token: string;
  exp: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  token: string;
  expiration: number;
  email: string;
  name: string;
}
