import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product, ApiResponse, ProductRequest} from '..';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>('products');
  }

  getProduct(id: number): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`products/${id}`);
  }

  createProduct(product: ProductRequest): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>('products', product);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(`products/${id}`, product);
  }

  deleteProduct(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`products/${id}`);
  }
}
