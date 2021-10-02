import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ProductCardModule } from './../../../shared/component/product-card/product-card.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardModule } from 'ng-zorro-antd/card';

const nzModule = [
  NzInputModule,
  NzIconModule,
  NzPaginationModule,
  NzButtonModule,
  NzAvatarModule,
  NzCheckboxModule,
  NzMessageModule,
  NzPopconfirmModule,
  NzTagModule,
  NzMenuModule,
  NzDividerModule,
  NzTabsModule,
  NzSelectModule,
  NzCardModule,
  NzGridModule
];
const nzModule = [
  NzInputModule,
  NzIconModule,
  NzPaginationModule,
  NzButtonModule,
  NzAvatarModule,
  NzCheckboxModule,
  NzMessageModule,
  NzPopconfirmModule,
  NzTagModule,
  NzMenuModule,
  NzDividerModule,
  NzTabsModule,
  NzSelectModule,
  NzCardModule
];

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    nzModule,
    FormsModule,
    ProductCardModule
    ProductRoutingModule,
    nzModule,
    FormsModule
  ]
})
export class ProductModule { }
