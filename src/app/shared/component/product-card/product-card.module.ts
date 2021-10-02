import { CurrencyVNDPipe } from './../../pipe/currency.pipe';
import { FormsModule } from '@angular/forms';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';



const nzModule = [
  NzCardModule,
  NzAvatarModule,
  NzRateModule,
  FormsModule
];

@NgModule({
  declarations: [
    ProductCardComponent,
    CurrencyVNDPipe
  ],
  imports: [
    CommonModule,
    nzModule
  ],
  exports: [
    ProductCardComponent
  ]

})
export class ProductCardModule { }
