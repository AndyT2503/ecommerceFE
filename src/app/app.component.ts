import { Component, OnInit } from '@angular/core';
import { AuthenticationQuery } from 'src/app/core/authentication/state/authentication.query';
import { AuthenticationService } from './core/authentication/state/authentication.service';
import { AuthenticationStore } from './core/authentication/state/authentication.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private readonly authenticationService: AuthenticationService, 
    private readonly authenticationStore: AuthenticationStore,
    private readonly authenticationQuery: AuthenticationQuery) {
  }

  ngOnInit(): void {
    this.authenticationService.getUserProfile().subscribe(
      () => {},
      (err) => this.authenticationStore.reset()
    );
  }
}
