export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  images: { secureUrl: string; publicId: string }[];
}

export interface UpdateProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  images: { secureUrl: string; publicId: string }[];
}
