import { Injectable } from '@angular/core';
import { EntityState, EntityStore, persistState, StoreConfig } from '@datorama/akita';
import { ProductCategory } from './../../../../shared/models/product.model';

export interface CartItem extends ProductCategory {
  quantity: number;
  totalPrice: number;
}

export interface CartState extends EntityState<CartItem, string> {
}


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cart',  resettable: true})
export class CartStore extends EntityStore<CartState> {

  constructor() {
    super();
  }

}

export const cartPersistStorage = persistState({
  include: ['cart'],
  key: 'cartStore',
  storage: sessionStorage
});

const providers = [
  { provide: 'persistStorage', useValue: cartPersistStorage, multi: true },
];