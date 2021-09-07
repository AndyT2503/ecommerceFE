import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './../../authentication/login/login.component';
import { AuthenticationQuery } from './../../authentication/state/authentication.query';
import { AuthenticationStore } from './../../authentication/state/authentication.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('loginPage') loginComponent!: LoginComponent;
  userProfile$ = this.authenticationQuery.select(x => x.userProfile);
  constructor(
    private readonly authenticationQuery: AuthenticationQuery,
    private readonly authenticationStore: AuthenticationStore,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    //TODO: Implement something
    console.log();
  }



  login(): void {
    this.loginComponent.isModalVisible = true;
  }

  logout(): void {
    this.authenticationStore.reset();
    this.router.navigate(['']);
  }

  goAdminPage(): void {
    this.router.navigate(['admin']);
  }
}
