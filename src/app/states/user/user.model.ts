export interface User {
  id: string;
  lastName: string;
  firstName: string;
  username: string;
  role: string;
}

export function createUser(params: Partial<User>) {
  return {

  } as User;
}
