import { LoginComponent } from './../../authentication/login/login.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('loginPage') loginComponent!: LoginComponent;
  constructor() { }

  ngOnInit(): void {
    //TODO: Implement something
    console.log();
  }

  login(): void {
    this.loginComponent.isModalVisible = true;
  }
}