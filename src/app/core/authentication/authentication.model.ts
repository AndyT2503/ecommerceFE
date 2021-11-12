export interface Authentication extends AuthenticationUser {
  accessToken: string;
  refreshToken: string;
}

export interface AuthenticationUser {
  id: string;
  lastName: string;
  firstName: string;
  role: string;
  isAuthenticate: boolean;
  username: string;
}

export interface RefreshToken {
  accessToken: string;
}
export function createAuthentication() {
  return {

  } as Authentication;
}
