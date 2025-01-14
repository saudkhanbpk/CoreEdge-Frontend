// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
// import { catchError, tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class SharedService {
//   private apiUrl = `${environment.apiUrl}/order`;
//   private dataCache: any[] | null = null; // Cache the data
//   private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

//   constructor(private http: HttpClient) {}

//   // Fetch data from the API or cache
//   getData(userId: number): Observable<any[]> {
//     if (this.dataCache) {
//       return of(this.dataCache); // Return cached data as an Observable
//     } else {
//       return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`).pipe(
//         tap((data) => {
//           this.dataCache = data; // Cache the data
//           this.dataSubject.next(data); // Notify subscribers
//         })
//       );
//     }
//   }

//   // Reload data when there is an update
//   reloadData(userId: number): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`).pipe(
//       tap((data) => {
//         console.log("data : ", data);
//         this.dataCache = data; // Update cache
//         this.dataSubject.next(data); // Notify subscribers
//       }),
//       catchError((error) => {
//         console.error("Error reloading data:", error);
//         return of([]); // Return an empty array in case of error
//       })
//     );
//   }
  
  

//   // Expose BehaviorSubject as Observable for component subscription
//   getDataSubject(): Observable<any[]> {
//     return this.dataSubject.asObservable();
//   }
// }


import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private orderApiUrl = `${environment.apiUrl}/order`;
  private purchaseOrderApiUrl = `${environment.apiUrl}/purchase-orders`;

  // Order data cache and subject
  private orderCache: any[] | null = null;
  private orderSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  // Purchase order data cache and subject
  private purchaseOrderCache: any[] | null = null;
  private purchaseOrderSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);


  private selectedOrderSubject = new BehaviorSubject<any>(null);
  selectedOrder$ = this.selectedOrderSubject.asObservable();

  private searchTermSubject = new BehaviorSubject<string>('');
  currentSearchTerm = this.searchTermSubject.asObservable();
  // this search term form catalog main component
  updateSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }


  constructor(private http: HttpClient) {}

  // =================== ORDER METHODS ===================

  // Fetch orders from the API or cache
  getData(userId: number): Observable<any[]> {
    if (this.orderCache) {
      return of(this.orderCache); // Return cached data as an Observable
    } else {
      return this.http.get<any[]>(`${this.orderApiUrl}/user/${userId}`).pipe(
        tap((data) => {
          this.orderCache = data; // Cache the data
          this.orderSubject.next(data); // Notify subscribers
        })
      );
    }
  }

  // Reload orders when there is an update
  reloadData(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.orderApiUrl}/user/${userId}`).pipe(
      tap((data) => {
        console.log('Orders data:', data);
        this.orderCache = data; // Update cache
        this.orderSubject.next(data); // Notify subscribers
      }),
      catchError((error) => {
        console.error('Error reloading orders:', error);
        return of([]); // Return an empty array in case of error
      })
    );
  }

  // Expose order BehaviorSubject as Observable for subscription
  getDataSubject(): Observable<any[]> {
    return this.orderSubject.asObservable();
  }

  // =================== PURCHASE ORDER METHODS ===================

  // Fetch purchase orders from the API or cache
  getPurchaseOrders(userId:number): Observable<any[]> {
    if (this.purchaseOrderCache) {
      return of(this.purchaseOrderCache); // Return cached data
    } else {
      return this.http.get<any[]>(`${this.purchaseOrderApiUrl}/user/${userId}`).pipe(
        tap((data) => {
          this.purchaseOrderCache = data; // Cache the data
          this.purchaseOrderSubject.next(data); // Notify subscribers
        }),
        catchError((error) => {
          console.error('Error fetching purchase orders:', error);
          return of([]); // Return empty array in case of error
        })
      );
    }
  }

  // Fetch a specific purchase order by ID
  getPurchaseOrderById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.purchaseOrderApiUrl}/user/${userId}`).pipe(
      catchError((error) => {
        console.error(`Error fetching purchase order with ID ${userId}:`, error);
        return of(null); // Return null in case of error
      })
    );
  }

  // Reload purchase orders when there is an update
  reloadPurchaseOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.purchaseOrderApiUrl).pipe(
      tap((data) => {
        console.log('Purchase orders data:', data);
        this.purchaseOrderCache = data; // Update cache
        this.purchaseOrderSubject.next(data); // Notify subscribers
      }),
      catchError((error) => {
        console.error('Error reloading purchase orders:', error);
        return of([]); // Return an empty array in case of error
      })
    );
  }

  // Expose purchase order BehaviorSubject as Observable for subscription
  getPurchaseOrderSubject(): Observable<any[]> {
    return this.purchaseOrderSubject.asObservable();
  }


  // =================== Selected PURCHASE ORDER METHODS ===================


  setSelectedOrder(order: any): void {
    this.selectedOrderSubject.next(order);
  }

  getSelectedOrder(): any {
    return this.selectedOrderSubject.value;
  }
}
