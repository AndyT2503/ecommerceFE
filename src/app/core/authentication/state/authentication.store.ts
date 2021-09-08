import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Authentication, AuthenticationUser } from './authentication.model';

export interface AuthenticationState extends EntityState<Authentication> {
  accessToken: string;
  userProfile: AuthenticationUser;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'authentication', resettable: true })
export class AuthenticationStore extends EntityStore<AuthenticationState> {

  constructor() {
    super({
      userProfile: {} as AuthenticationUser
    });
  }

}
