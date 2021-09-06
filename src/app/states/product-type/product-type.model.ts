import { Supplier } from './../supplier/supplier.model';

export interface ProductType {
  id: string;
  name: string;
  code: string;
  suppliers?: Supplier[];
}

export function createProductType(params: Partial<ProductType>) {
  return {

  } as ProductType;
}
