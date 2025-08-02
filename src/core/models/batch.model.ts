export interface Batch {
  id?: number;
  production_date: string;
  description?: string;
  products?: BatchProduct[];
  total_products?: number;
  created_at?: string;
  updated_at?: string;
}

export interface BatchProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  pivot?: {
    quantity: number;
    created_at?: string;
    updated_at?: string;
  };
}

export interface BatchRequest {
  production_date: string;
  description?: string;
  products: {
    product_id: number;
    quantity: number;
  }[];
}
