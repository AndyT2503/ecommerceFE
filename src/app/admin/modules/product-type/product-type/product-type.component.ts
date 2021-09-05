import { ProductType } from './../../../../states/state/product-type.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {

  productTypes: ProductType[] = [];
  isAdding = false;
  constructor() { }

  ngOnInit(): void {
    this.productTypes = [
      {
        name: 'Điện thoại',
        id: '',
        code: 'phone'
      }
    ];
  }

}
