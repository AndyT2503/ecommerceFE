import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ProductTypeStore, ProductTypeState } from './product-type.store';

@Injectable({ providedIn: 'root' })
export class ProductTypeQuery extends QueryEntity<ProductTypeState> {

  constructor(protected store: ProductTypeStore) {
    super(store);
  }

}
