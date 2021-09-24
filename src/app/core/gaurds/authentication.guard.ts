import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './../authentication/state/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private readonly authenticationService: AuthenticationService, private readonly router: Router) { }
  canActivate(): Observable<boolean | UrlTree> {
    return this.authenticationService.hasValidToken().pipe(
      map(responseOk => {
        if (!responseOk) {
          return this.router.parseUrl('');
        }
        return responseOk;
      })
    );
  }

}
