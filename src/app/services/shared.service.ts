import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private apiUrl = `${environment.apiUrl}/order`;
  private dataCache: any[] | null = null; // Cache the data
  private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  // Fetch data from the API or cache
  getData(userId: number): Observable<any[]> {
    if (this.dataCache) {
      return of(this.dataCache); // Return cached data as an Observable
    } else {
      return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`).pipe(
        tap((data) => {
          this.dataCache = data; // Cache the data
          this.dataSubject.next(data); // Notify subscribers
        })
      );
    }
  }

  // Reload data when there is an update
  reloadData(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`).pipe(
      tap((data) => {
        console.log("data : ", data);
        this.dataCache = data; // Update cache
        this.dataSubject.next(data); // Notify subscribers
      }),
      catchError((error) => {
        console.error("Error reloading data:", error);
        return of([]); // Return an empty array in case of error
      })
    );
  }
  
  

  // Expose BehaviorSubject as Observable for component subscription
  getDataSubject(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }
}
