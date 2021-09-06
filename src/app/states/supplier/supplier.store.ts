import { PagingModel } from './../../shared/model/paging-model';
import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Supplier } from './supplier.model';

export interface SupplierState extends EntityState<Supplier> {
  supplierNameFilter: string;
  pageIndex: number;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'supplier', resettable: true })
export class SupplierStore extends EntityStore<SupplierState> {

  constructor() {
    super();
  }

}
