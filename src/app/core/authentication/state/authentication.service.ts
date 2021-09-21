import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { Authentication, AuthenticationUser } from './authentication.model';
import { AuthenticationQuery } from './authentication.query';
import { AuthenticationStore } from './authentication.store';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private authenticationStore: AuthenticationStore, private http: HttpClient, private authenticationQuery: AuthenticationQuery) {
  }


  login(username: string, password: string) {
    return this.http.post<Authentication>('api/auth/login', {
      username,
      password
    }).pipe(tap((res) => {
      this.authenticationStore.update({ accessToken: res.accessToken });
    }));
  }

  getUserProfile() {
    return this.authenticationQuery.select(x => x.accessToken).pipe(
      filter(x => !!x),
      mergeMap(accessToken => {
        const header = new HttpHeaders({
          'authorization': `Bearer ${accessToken}`
        });
        return this.http.get<AuthenticationUser>('api/auth/user-profile', {
          headers: header
        }).pipe(tap(res => {
          this.authenticationStore.update({ userProfile: { ...res, isAuthenticate: true } });
        }));
      })
    );
  }

  hasValidToken() {
    const { accessToken } = this.authenticationQuery.getValue();
    if (!accessToken) {
      return of(false);
    }
    const header = new HttpHeaders({
      'authorization': `Bearer ${accessToken}`
    });
    return this.http.get<AuthenticationUser>('api/auth/user-profile', {
      headers: header
    }).pipe(
      map(_ => {
        return true;
      }),
      catchError(_ => {
        return of(false);
      }));
  }
}
