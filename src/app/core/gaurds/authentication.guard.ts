import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationQuery } from '../authentication/state/authentication.query';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private readonly authenticationQuery: AuthenticationQuery) {}
  canActivate(): Observable<boolean>  {
    return this.authenticationQuery.select(x => x.userProfile).pipe(map(res => res.isAuthenticate));
  }
  
}
