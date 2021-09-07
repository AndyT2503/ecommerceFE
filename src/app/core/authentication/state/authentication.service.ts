import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Authentication, User } from './authentication.model';
import { AuthenticationStore } from './authentication.store';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private authenticationStore: AuthenticationStore, private http: HttpClient) {
  }


  login(username: string, password: string) {
    return this.http.post<Authentication>('api/auth/login', {
      username,
      password
    }).pipe(tap((res) => {
      this.authenticationStore.update({accessToken: res.accessToken})
    }))
  }

  getUserProfile() {
    const accessToken = this.authenticationStore.getValue().accessToken;
    const header = new HttpHeaders({
      'authorization': `Bearer ${accessToken}`
    });
    return this.http.get<User>('api/auth/user-profile', {
      headers: header
    }).pipe(tap(res => {
      this.authenticationStore.update({userProfile: {...res, isAuthenticate: true}});
    }));
  }

}
