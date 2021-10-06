import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RoleDirectiveModule } from './../shared/directives/role-directive/role-directive.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';


const nzModule = [
  NzMenuModule,
  NzLayoutModule,
  NzIconModule,
  NzDropDownModule,
  NzAvatarModule
];

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    nzModule,
    RoleDirectiveModule
  ]
})
export class AdminModule { }
