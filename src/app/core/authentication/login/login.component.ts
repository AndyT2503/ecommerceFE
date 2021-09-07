import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationService } from './../state/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isModalVisible!: boolean;

  username!: string;
  password!: string;
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly nzMessage: NzMessageService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.isModalVisible = false;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  login(): void {
    this.isModalVisible = false
    this.authenticationService.login(this.username, this.password).subscribe(
      () => {
        this.nzMessage.success('Đăng nhập thành công');
        this.authenticationService.getUserProfile().subscribe();
      },
      (err) => this.nzMessage.error(err.error.detail)
    );
  }
}
