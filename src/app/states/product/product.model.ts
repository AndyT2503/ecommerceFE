export interface Product {
  id?: string;
  slug?: string;
  name: string;
  description: string;
  status: string;
  availableStatus?: string;
  originalPrice: number;
  specialFeatures: string[];
  supplierName?: string;
  productTypeName?: string;
  supplierId?: string;
  productTypeId?: string;
  currentPrice?: number;
  image?: number;
  categories?: ProductCategory[];
  configuration?: MobileConfiguration | TabletConfiguration | LaptopConfiguration | WatchConfiguration;
}

export interface ProductCategory {
  id?: string;
  name: string;
  image: string;
  price: string;
}

export interface Configuration {
  hardDisk: string;
  pin: string;
  system: string;
  chargingPort: string;
  screenTech: string;
  screenSize: number;
}

export interface MobileConfiguration extends Configuration {
  mainCamera: string;
  frontCamera: string;
  chipSet: string;
  sim: string;
  ram: string;
}

export interface TabletConfiguration extends MobileConfiguration {
}

export interface LaptopConfiguration extends Configuration {
  cpu: string;
  vga: string;
  ram: string;
}

export interface WatchConfiguration extends Configuration {
  screenDiameter: string;
  features: string[];
}

export function createProduct(params: Partial<Product>) {
  return {

  } as Product;
}
