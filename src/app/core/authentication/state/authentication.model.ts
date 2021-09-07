export interface Authentication extends User {
  accessToken: string;
}

export interface User {
  id: string;
  lastName: string;
  firstName: string;
  role: string;
  isAuthenticate: boolean;
}
export function createAuthentication(params: Partial<Authentication>) {
  return {

  } as Authentication;
}
