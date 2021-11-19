import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerInfo, OrderInfo } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

  constructor(private http: HttpClient) { }

  createOrder(customerInfo: CustomerInfo, orderInfo: OrderInfo) {
    return this.http.post('api/order', {
      ...customerInfo,
      ...orderInfo
    });
  }
}
