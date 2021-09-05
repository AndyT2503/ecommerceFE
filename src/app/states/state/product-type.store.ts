import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ProductType } from './product-type.model';

export interface ProductTypeState extends EntityState<ProductType> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'product-type' })
export class ProductTypeStore extends EntityStore<ProductTypeState> {

  constructor() {
    super();
  }

}
