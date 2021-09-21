import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './../authentication/state/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private readonly authenticationService: AuthenticationService) {}
  canActivate(): Observable<boolean>  {
    return this.authenticationService.hasValidToken();
  }
  
}
