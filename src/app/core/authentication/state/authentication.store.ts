import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Authentication } from './authentication.model';

export interface AuthenticationState extends EntityState<Authentication> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'authentication' })
export class AuthenticationStore extends EntityStore<AuthenticationState> {

  constructor() {
    super();
  }

}
