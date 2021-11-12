import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {EMPTY, of} from 'rxjs';
import {catchError, filter, map, mergeMap, tap} from 'rxjs/operators';
import {SignalRService} from '../signalR/signal-r.service';
import {Authentication, AuthenticationUser, RefreshToken} from './authentication.model';
import {AuthenticationQuery} from './authentication.query';
import {AuthenticationStore} from './authentication.store';

@Injectable()
export class AuthenticationService {

  constructor(
    private authenticationStore: AuthenticationStore,
    private http: HttpClient,
    private authenticationQuery: AuthenticationQuery,
    private signalRService: SignalRService,
    private router: Router
  ) {
  }


  login(username: string, password: string) {
    return this.http.post<Authentication>('api/auth/login', {
      username,
      password
    }).pipe(tap((res) => {
      this.authenticationStore.update({accessToken: res.accessToken});
      this.authenticationStore.update({refreshToken: res.refreshToken});
    }));
  }

  logout(): void {
    this.disconnectSocket();
    this.authenticationStore.reset();
    this.router.navigate(['']);
  }

  refreshToken() {
    const { refreshToken } = this.authenticationStore.getValue();
    return this.http.post<RefreshToken>('api/auth/refresh-token', {
      refreshToken
    }).pipe(
      tap(
        res => {
          this.authenticationStore.update({accessToken: res.accessToken});
        }
      ),
      catchError(
        _ => {
          this.disconnectSocket();
          this.authenticationStore.reset();
          return EMPTY;
        }
      )
    );
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
        });
      }),
      tap(res => {
        this.connectSocket();
        this.authenticationStore.update({userProfile: {...res, isAuthenticate: true}});
      }),
      catchError(() => {
        return this.refreshToken();
      })
    );
  }

  private disconnectSocket(): void {
    this.signalRService.disconnectConnection();
  }

  private connectSocket(): void {
    this.signalRService.startConnection();
  }

  hasValidToken() {
    const {accessToken} = this.authenticationQuery.getValue();
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
        return this.refreshToken().pipe(
          map(_ => true),
          catchError(_ => of(false))
        );
      }));
  }
}
