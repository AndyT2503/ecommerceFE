import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AuthenticationStore, AuthenticationState } from './authentication.store';

@Injectable({ providedIn: 'root' })
export class AuthenticationQuery extends QueryEntity<AuthenticationState> {

  constructor(protected store: AuthenticationStore) {
    super(store);
  }

}