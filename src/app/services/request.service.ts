import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = `${environment.apiUrl}/order`;
  constructor(private http: HttpClient) { }
  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Method to retrieve an Catalog item by ID
  findById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  findByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
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
  
  updateunavailableProductStatus(
    orderId: number,
    unavailableProducts: Array<{ product: any; status: string }>
  ): Observable<any> {
    const url = `${this.apiUrl}/${orderId}/update-status`;
    return this.http.patch(url, { unavailableProducts });
  }


  // Method to update an existing Catalog item
  updateCatalogItem(id: number, order: Partial<any>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, order);
  }

  // Method to delete an Catalog item by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
