// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class PurchaseOrderService {
//   private apiUrl = `${environment.apiUrl}/purchase-orders`;
//   user: any;
//   constructor(private http: HttpClient, private authService: AuthService) {
//     this.user = this.authService.getUserData();
//   }

//   findAll(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

//   findById(id: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/${id}`);
//   }

//   findVendorOrders(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/vendor/${this.user.id}`);
//   }
//   updatePurchaseOrder(id: number, updateData: any): Observable<any> {
//     return this.http.patch(`${this.apiUrl}/${id}`, updateData);
//   }

//   getOrdersWithRMA(userId: number): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/rma/${userId}`);
//   }
 
//   findAdminOrders(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/user/${this.user.id}`);
//   }

//   create(order: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, order);
//   }

//   updatePurchaseStatus(
//     orderId: number,
//     status: any
//   ): Observable<any> {
//     const url = `${this.apiUrl}/${orderId}/status`;
//     return this.http.put(url, status);
//   }

//   updateUnavailableProductStatus(
//     orderId: number,
//     unavailableProducts: Array<{ product: any; status: string }>
//   ): Observable<any> {
//     const url = `${this.apiUrl}/${orderId}/update-status`;
//     return this.http.patch(url, { unavailableProducts });
//   }

//   // updatePurchaseOrder(id: number, order: Partial<any>): Observable<void> {
//   //   return this.http.put<void>(`${this.apiUrl}/${id}`, order);
//   // }

//   delete(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService {
  private apiUrl = `${environment.apiUrl}/purchase-orders`;
  private user: any;
  
  // Caching for Vendor & Admin Orders
  private vendorOrdersCache = new BehaviorSubject<any[]>([]);
  private adminOrdersCache = new BehaviorSubject<any[]>([]);
  private rmaOrdersCache = new BehaviorSubject<any[] | null>(null);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.user = this.authService.getUserData();
  }

  private handleError(error: any) {
    console.error('Error in PurchaseOrderService:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }

  /** 🔹 Get All Purchase Orders */
  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  /** 🔹 Get Purchase Order by ID */
  findById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  /** 🔹 Get Vendor Orders (Cached) */
  findVendorOrders(): Observable<any> {
    if (this.vendorOrdersCache.value.length > 0) {
      return this.vendorOrdersCache.asObservable();
    }

    return this.http.get<any>(`${this.apiUrl}/vendor/${this.user.id}`).pipe(
      tap((orders) => this.vendorOrdersCache.next(orders)), 
      catchError(this.handleError)
    );
  }

  /** 🔹 Get Admin Orders (Cached) */
  findAdminOrders(): Observable<any> {
    if (this.adminOrdersCache.value.length > 0) {
      return this.adminOrdersCache.asObservable();
    }

    return this.http.get<any>(`${this.apiUrl}/user/${this.user.id}`).pipe(
      tap((orders) => this.adminOrdersCache.next(orders)), 
      catchError(this.handleError)
    );
  }

  /** 🔹 Get Orders with RMA (Return Merchandise Authorization) */
  // getOrdersWithRMA(userId: number): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/rma/${userId}`).pipe(catchError(this.handleError));
  // }

  getOrdersWithRMA(userId: number, type:string): Observable<any> {
    if (this.rmaOrdersCache.value) {
      return this.rmaOrdersCache.asObservable(); // Return cached data if available
    }
  
    return this.http.get<any[]>(`${this.apiUrl}/rma/${type}/${userId}`).pipe(
      tap((orders) => this.rmaOrdersCache.next(orders)), // Store response in cache
      catchError(this.handleError)
    );
  }

  /** 🔹 Create New Purchase Order */
  create(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order).pipe(catchError(this.handleError));
  }

  /** 🔹 Update Purchase Order */
  updatePurchaseOrder(id: number, updateData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, updateData).pipe(catchError(this.handleError));
  }

  /** 🔹 Update Purchase Status */
  updatePurchaseStatus(orderId: number, status: any): Observable<any> {
    const url = `${this.apiUrl}/${orderId}/status`;
    return this.http.put(url, status).pipe(catchError(this.handleError));
  }

  /** 🔹 Update Unavailable Product Status */
  updateUnavailableProductStatus(
    orderId: number,
    unavailableProducts: Array<{ product: any; status: string }>
  ): Observable<any> {
    const url = `${this.apiUrl}/${orderId}/update-status`;
    return this.http.patch(url, { unavailableProducts }).pipe(catchError(this.handleError));
  }

  /** 🔹 Delete Purchase Order */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  /** 🔹 Clear Cached Data (Useful if fresh data is needed) */
  clearCache() {
    this.vendorOrdersCache.next([]);
    this.adminOrdersCache.next([]);
  }
}
