import { Supplier } from './../../../../shared/models/supplier.model';
import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { PagingModel } from './../../../../shared/models/paging-model';
import { ProductType } from './../../../../shared/models/product-type.model';
import { Product } from './../../../../shared/models/product.model';

export interface ProductState extends EntityState<Product> {}


export interface ProductState {
  productPaging: PagingModel<Product>;
  productNameFilter: string;
  pageIndex: number;
  pageSize: number;
  productTypeList: ProductType[];
  supplierList: Supplier[];
}

export function createInitialState(): ProductState {
  return {
    productPaging: {} as PagingModel<Product>,
    productNameFilter: '',
    pageIndex: 1,
    pageSize: 10,
    productTypeList: [],
    supplierList: []
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'product' })
export class ProductStore extends EntityStore<ProductState> {

  constructor() {
    super(createInitialState());
  }

}
