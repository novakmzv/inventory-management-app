import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Batch, BatchRequest, ApiResponse, BatchProduct} from '..';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private http: HttpClient) { }

  getBatches(): Observable<ApiResponse<Batch[]>> {
    return this.http.get<ApiResponse<Batch[]>>('batches');
  }

  getBatch(id: number): Observable<ApiResponse<Batch>> {
    return this.http.get<ApiResponse<Batch>>(`batches/${id}`);
  }

  createBatch(batch: BatchRequest): Observable<ApiResponse<Batch>> {
    return this.http.post<ApiResponse<Batch>>('batches', batch);
  }

  updateBatch(id: number, batch: BatchRequest): Observable<ApiResponse<Batch>> {
    return this.http.put<ApiResponse<Batch>>(`batches/${id}`, batch);
  }

  deleteBatch(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`batches/${id}`);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  calculateTotalProducts(products: BatchProduct[]): number {
    return products.reduce((total, product) => total + product.quantity, 0);
  }
}
