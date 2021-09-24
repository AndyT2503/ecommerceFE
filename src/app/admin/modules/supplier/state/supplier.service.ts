import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SupplierApiService } from './../../../../shared/api-services/supplier-api.service';
import { SupplierStore } from './supplier.store';

@Injectable({ providedIn: 'root' })
export class SupplierService {

  constructor(private supplierStore: SupplierStore, private supplierApiService: SupplierApiService) {
  }

  createSupplier(name: string, code: string, logo: string, productTypes: string[]) {
    return this.supplierApiService.createSupplier(name, code, logo, productTypes);
  }

  updateSupplier(id:string, name: string, code: string, logo: string, productTypes: string[]) {
    return this.supplierApiService.updateSupplier(id, name, code, logo, productTypes);
  }

  getSupplierById(id: string) {
    return this.supplierApiService.getSupplierById(id);
  }

  deleteSupplier(id: string) {
    return this.supplierApiService.deleteSupplier(id);
  }

  getSupplier(name: string, pageIndex?: number, pageSize?: number) {
    return this.supplierApiService.getSupplier(name, pageIndex, pageSize).pipe(
      tap((res) => this.supplierStore.update({supplierPaging: res}))
    );
  }
}
