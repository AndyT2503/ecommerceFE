import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { ProductDetailComponent } from './product-detail.component';


const nzModules = [
  NzRateModule,
  NzCarouselModule,
  NzIconModule
];

@NgModule({
  declarations: [
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    nzModules,
    FormsModule
  ]
})
export class ProductDetailModule { }
