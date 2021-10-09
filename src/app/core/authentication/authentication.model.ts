export interface Authentication extends AuthenticationUser {
  accessToken: string;
}

export interface AuthenticationUser {
  id: string;
  lastName: string;
  firstName: string;
  role: string;
  isAuthenticate: boolean;
  username: string;
}
export function createAuthentication(params: Partial<Authentication>) {
  return {

  } as Authentication;
}
