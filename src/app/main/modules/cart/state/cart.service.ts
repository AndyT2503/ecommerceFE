import { Injectable } from '@angular/core';
import { SaleCodeApiService } from './../../../../shared/api-services/sale-code-api.service';
import { ProductCategory } from './../../../../shared/models/product.model';
import { CartQuery } from './cart.query';
import { CartStore } from './cart.store';

@Injectable({ providedIn: 'root' })
export class CartService {

  constructor(private cartStore: CartStore, private cartQuery: CartQuery, private saleCodeApiService: SaleCodeApiService) {
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

  getSaleCodeByCode(code: string) {
    return this.saleCodeApiService.getSaleCodeByCode(code);
  }
}