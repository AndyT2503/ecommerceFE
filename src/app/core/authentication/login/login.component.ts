import { AuthenticationService } from './../state/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isModalVisible!: boolean;

  constructor(private readonly authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isModalVisible = false;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  login(): void {
    this.isModalVisible = false
    this.authenticationService.login();
  }
}
