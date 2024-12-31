import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService {
  private apiUrl = `${environment.apiUrl}/purchase-orders`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }

  updateProductStatus(
    orderId: number,
    availableProducts: Array<{ product: any; status: string }>
  ): Observable<any> {
    const url = `${this.apiUrl}/${orderId}/update-status`;
    return this.http.patch(url, { availableProducts });
  }

  updateUnavailableProductStatus(
    orderId: number,
    unavailableProducts: Array<{ product: any; status: string }>
  ): Observable<any> {
    const url = `${this.apiUrl}/${orderId}/update-status`;
    return this.http.patch(url, { unavailableProducts });
  }

  updatePurchaseOrder(id: number, order: Partial<any>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, order);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
