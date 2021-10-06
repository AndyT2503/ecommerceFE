import { Product } from './../../../../shared/models/product.model';
import { ProductApiService } from './../../../../shared/api-services/product-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { ProductStore } from './product.store';

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(private productStore: ProductStore, private http: HttpClient, private productApiService : ProductApiService ) {
  }


  getProduct(name: string, pageIndex?: number, pageSize?: number) {
    return this.productApiService.getProducts(name, pageIndex, pageSize).pipe(
      tap(res => {
        this.productStore.update({ productPaging: res });
      })
    );
  }

  // createSaleCode(code: string, percent: number, maxPrice: number, validUntil: Date) {
  //   return this.saleCodeApiService.createSaleCode(code, percent, maxPrice, validUntil);
  // }

  // updateSaleCode(code: string, percent: number, maxPrice: number, validUntil: Date) {
  //   return this.saleCodeApiService.updateSaleCode(code, percent, maxPrice, validUntil);
  // }

  // deleteSaleCode(code: string) {
  //   return this.saleCodeApiService.deleteSaleCode(code);
  // }


}
