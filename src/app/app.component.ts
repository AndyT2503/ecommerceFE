import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/authentication/state/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private readonly authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authenticationService.getUserProfile().subscribe();
  }
}
