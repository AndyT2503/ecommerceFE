import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Authentication, User } from './authentication.model';

export interface AuthenticationState extends EntityState<Authentication> {
  accessToken: string;
  userProfile: User;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'authentication', resettable: true })
export class AuthenticationStore extends EntityStore<AuthenticationState> {

  constructor() {
    super({
      userProfile: {} as User
    });
  }

}
