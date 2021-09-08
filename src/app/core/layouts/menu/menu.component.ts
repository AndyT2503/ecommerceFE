import { Component, OnInit } from '@angular/core';
import { ProductType as productType } from '../../const/product-type';
import { ProductType } from './../../../states/product-type/product-type.model';
import { ProductTypeService } from './../../../states/product-type/product-type.service';


export interface SubMenuItem extends ProductType {
  icon: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menu: SubMenuItem[] = [];
  constructor(private readonly productTypeService: ProductTypeService) { }

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu(): void {
    this.productTypeService.getProductType('').subscribe(
      res => {
        this.menu = res.map(item => (
          {
            ...item,
            icon: this.setIconMenu(item.code)
          }
        ));
      }
    );
  }

  setIconMenu(code: string): string {
    switch (code) {
      case productType.Smartwatch:
        return 'clock-circle';
      case productType.Phone:
        return 'mobile';
      case productType.Laptop:
        return 'laptop';
      case productType.Audio:
        return 'customer-service';
      case productType.Tablet:
        return 'book';
      default:
        return '';
    }
  }
}
