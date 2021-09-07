import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

const nzModule = [
  NzCarouselModule
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    nzModule
  ]
})
export class HomeModule { }
