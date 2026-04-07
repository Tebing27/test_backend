export interface JwtPayload {
  sub: number;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedUser {
  userId: number;
  email: string;
}

export interface TokenResponse {
  access_token: string;
}

export interface LoginResponse extends TokenResponse {
  refresh_token: string;
}
