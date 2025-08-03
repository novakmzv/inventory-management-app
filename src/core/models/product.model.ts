export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductRequest{
  name: string;
  quantity: number;
  price: number;
  description?: string;
}
