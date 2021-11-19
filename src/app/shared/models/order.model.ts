import { PaymentMethod } from "src/app/core/const/payment-method";

export interface CustomerInfo {
  email: string;
  phoneNumber: string;
  provinceCode: string;
  districtCode: string;
  address: string;
  note: string;
  customerName: string;
}

export interface OrderInfo {
  saleCode: string;
  paymentMethod: PaymentMethod;
  orderDetails: OrderDetail[];
}

export interface OrderDetail {
  categoryId: string;
  quantity: number;
}