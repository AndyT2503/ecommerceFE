import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { Authentication } from './authentication.model';
import { AuthenticationStore } from './authentication.store';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private authenticationStore: AuthenticationStore, private http: HttpClient, private readonly router: Router) {
  }


  login(): void {
    this.router.navigate(['admin']);
  }

}
