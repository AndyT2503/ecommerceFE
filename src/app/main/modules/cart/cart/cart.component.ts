import { CartItem } from './../state/cart.store';
import { CartService } from './../state/cart.service';
import { CartQuery } from './../state/cart.query';
import { Province } from './../../../../shared/models/location-model';
import { LOCATIONDATA } from './../../../../core/data/location.data';
import { Component, OnInit } from '@angular/core';
import { District } from 'src/app/shared/models/location-model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  provinceList = LOCATIONDATA;
  districtList: District[] = [];
  // TODO: user form control
  provinceSelected!: Province;
  cart$ = this.cartQuery.cart$;
  salePrice = 0;
  totalPrice$ = this.cartQuery.totalPrice$;
  constructor(
    private readonly cartQuery: CartQuery,
    private readonly cartService: CartService
  ) { }

  ngOnInit(): void {
    // TODO: Do something
    console.log();
  }

  provinceChange(provinceCode: string): void {
    this.districtList = LOCATIONDATA.find(x => x.code === provinceCode)!.districts;
  }

  removeItem(categoryId: string): void {
    this.cartService.removeProduct(categoryId);
  }

  updateQuantity(categoryId: string, quantity: number): void {
    this.cartService.updateQuantityCategory(categoryId, quantity);
  }
}
