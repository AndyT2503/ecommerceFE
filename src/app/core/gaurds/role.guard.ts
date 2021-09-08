import { map } from 'rxjs/operators';
import { AuthenticationQuery } from 'src/app/core/authentication/state/authentication.query';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private readonly authenticationQuery: AuthenticationQuery) {}
  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean>  {
    const { requireRoles = [] } = route.data ;
    return this.authenticationQuery.select(x => x.userProfile).pipe(map(user => requireRoles.includes(user.role)));
  }
  
}
