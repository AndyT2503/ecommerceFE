import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { OrderTrackingFormComponent } from './components/order-tracking-form/order-tracking-form.component';
import { OrderTrackingInfoComponent } from './components/order-tracking-info/order-tracking-info.component';
import { OrderTrackingTimelineComponent } from './components/order-tracking-timeline/order-tracking-timeline.component';
import { OrderTrackingRoutingModule } from './order-tracking-routing.module';
import { OrderTrackingComponent } from './order-tracking.component';

const nzModules = [
  NzFormModule,
  NzInputModule,
  NzIconModule,
  NzTimelineModule,
  NzDividerModule
];

@NgModule({
  declarations: [
    OrderTrackingComponent,
    OrderTrackingFormComponent,
    OrderTrackingInfoComponent,
    OrderTrackingTimelineComponent
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
