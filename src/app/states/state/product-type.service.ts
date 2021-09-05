import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { ProductType } from './product-type.model';
import { ProductTypeStore } from './product-type.store';

@Injectable({ providedIn: 'root' })
export class ProductTypeService {

  constructor(private productTypeStore: ProductTypeStore, private http: HttpClient) {
  }


  get() {
    return this.http.get<ProductType[]>('https://api.com').pipe(tap(entities => {
      this.productTypeStore.set(entities);
    }));
  }

  add(productType: ProductType) {
    this.productTypeStore.add(productType);
  }

  update(id, productType: Partial<ProductType>) {
    this.productTypeStore.update(id, productType);
  }

  remove(id: ID) {
    this.productTypeStore.remove(id);
  }

}
