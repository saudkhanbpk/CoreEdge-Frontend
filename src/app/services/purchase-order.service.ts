import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService {
  private apiUrl = `${environment.apiUrl}/purchase-orders`;
  user: any;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.user = this.authService.getUserData();
  }

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  findVendorOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/vendor/${this.user.id}`);
  }
 
  findAdminOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${this.user.id}`);
  }

  create(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }

  updatePurchaseStatus(
    orderId: number,
    status: any
  ): Observable<any> {
    const url = `${this.apiUrl}/${orderId}/status`;
    return this.http.put(url, status);
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
