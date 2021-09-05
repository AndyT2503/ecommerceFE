import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { LoginComponent } from './authentication/login/login.component';
import { HeaderComponent } from './layouts/header/header.component';

const nzModule = [
  NzIconModule,
  NzInputModule,
  NzBadgeModule,
  NzDropDownModule,
  NzModalModule,
  NzButtonModule
];


@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    nzModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
