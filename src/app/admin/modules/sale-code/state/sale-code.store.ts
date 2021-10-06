import { PagingModel } from './../../../../shared/models/paging-model';
import { SaleCode } from './../../../../shared/models/sale-code.model';
import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SaleCodeState {
  saleCodePaging: PagingModel<SaleCode>;
}

export function createInitialState(): SaleCodeState {
  return {
    saleCodePaging: {} as PagingModel<SaleCode>
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'sale-code', resettable: true })
export class SaleCodeStore extends Store<SaleCodeState> {

  constructor() {
    super(createInitialState());
  }

}
