import { AuthenticationStore } from './core/authentication/state/authentication.store';
import { AuthenticationService } from './core/authentication/state/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly authenticationService: AuthenticationService, private readonly authenticationStore: AuthenticationStore) {
  }

  ngOnInit(): void {
    this.authenticationService.getUserProfile().subscribe(
      () => {},
      (err) => this.authenticationStore.reset()
    );
  }
}
