import { ProductType } from './../product-type/product-type.model';
export interface Supplier {
  id: string;
  name: string;
  logo: string;
  code: string;
  productTypes: ProductType[];
}

export function createSupplier(params: Partial<Supplier>) {
  return {

  } as Supplier;
}
