import { CartQuery } from './cart.query';
import { ProductCategory } from './../../../../shared/models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CartStore, CartItem } from './cart.store';

@Injectable({ providedIn: 'root' })
export class CartService {

  constructor(private cartStore: CartStore, private cartQuery: CartQuery, private http: HttpClient) {
  }

  updateQuantityCategory(id: string, quantity: number): void {
    this.cartStore.update(id, entity => {
      const newQuantity = quantity;
      const newTotalPrice = entity.price * newQuantity;
      return {
        ...entity,
        quantity: newQuantity,
        totalPrice: newTotalPrice
      };
    });
  }

  addCategoryToCart(category: ProductCategory): void {
    const findItem = this.cartQuery.getEntity(category.id!);
    if (!findItem) {
      this.cartStore.add({ ...category, quantity: 1, totalPrice: category.price });
      return;
    }
    this.cartStore.update(category.id!, entity => {
      const newQuantity = entity.quantity + 1;
      const newTotalPrice = entity.price * newQuantity;
      return {
        ...entity,
        quantity: newQuantity,
        totalPrice: newTotalPrice
      };
    });
  }

  removeProduct(categoryId: string): void {
    this.cartStore.remove(categoryId);
  }
}