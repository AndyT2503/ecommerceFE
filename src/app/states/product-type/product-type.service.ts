import { ProductType } from 'src/app/states/product-type/product-type.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductTypeService {

  constructor(private http: HttpClient) {
  }


  getProductType(name: string) {
    return this.http.get<ProductType[]>('api/product-type', {
      params: {
        name
      }
    }); 
  }

  deleteProductType(id: string) {
    return this.http.delete(`api/product-type/${id}`);
  }

  createProductType(name: string, code: string) {
    return this.http.post('api/product-type', {
      name,
      code
    });
  }

  updateProductType(id: string, name: string, code: string) {
    return this.http.put('api/product-type', {
      id,
      name,
      code
    });
  }

}
