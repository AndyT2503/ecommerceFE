import { PagingModel } from './../models/paging-model';
import { Product, ProductCategory } from './../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private readonly http: HttpClient) { }
  getProducts(name: string, pageIndex?: number, pageSize?: number) {
    return this.http.get<PagingModel<Product>>('api/product', {
      params: {
        pageIndex: `${pageIndex}`,
        pageSize: `${pageSize}`,
        name
      }
    });
  }

  createProduct(name: string, description: string, status: string, availableStatus: string, originalPrice: number,
    specialFeatures: string[], configuration: [], categories: ProductCategory[], supplierId: string, productTypeId: string) {
    return this.http.post('api/product', {
      name,
      description,
      status,
      availableStatus,
      originalPrice,
      specialFeatures,
      configuration,
      categories,
      supplierId,
      productTypeId
    });
  }

  updateSaleCode(code: string, percent: number, maxPrice: number, validUntil: Date) {
    // return this.http.put(`api/sale-code`, {
    //   code,
    //   percent,
    //   maxPrice,
    //   validUntil
    // });
  }

  deleteSaleCode(code: string) {
    // return this.http.delete(`api/sale-code/${code}`);
  }
}
