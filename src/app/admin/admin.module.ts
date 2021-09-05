import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';

const nzModule = [
  NzMenuModule
]

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    nzModule
  ]
})
export class AdminModule { }
