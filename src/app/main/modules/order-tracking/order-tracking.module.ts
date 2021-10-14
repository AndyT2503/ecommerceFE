import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderTrackingRoutingModule } from './order-tracking-routing.module';
import { OrderTrackingFormComponent } from './components/order-tracking-form/order-tracking-form.component';
import { OrderTrackingInfoComponent } from './components/order-tracking-info/order-tracking-info.component';
import { OrderTrackingComponent } from './order-tracking.component';
import { NzFormModule } from 'ng-zorro-antd/form';

const nzModules = [
  NzFormModule,
  NzInputModule,
  NzIconModule
];

@NgModule({
  declarations: [
    OrderTrackingComponent,
    OrderTrackingFormComponent,
    OrderTrackingInfoComponent
  ],
  imports: [
    CommonModule,
    OrderTrackingRoutingModule,
    nzModules,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrderTrackingModule { }
