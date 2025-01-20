import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private apiUrl = `${environment.apiUrl}/invoices`;
  private invoicesCache$ = new BehaviorSubject<any[] | null>(null);

  constructor(private http: HttpClient) {}

  // Share data between components
  private selectedInvoiceSubject = new BehaviorSubject<any[]>([]);
  currentInvoiceData = this.selectedInvoiceSubject.asObservable();

  sendAndGetInvoiceData(term: any): void {
    this.selectedInvoiceSubject.next(term);
  }

  // Create an invoice
  createInvoice(invoiceData: any): Observable<any> {
    return this.http
      .post<any>(this.apiUrl, invoiceData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(catchError(this.handleError));
  }

  // Get all invoices
  getAllInvoices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  // Get invoice by ID
  getInvoiceById(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Get invoices by Vendor ID
  getInvoicesByVendorId(vendorId: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/vendor/${vendorId}`)
      .pipe(catchError(this.handleError));
  }

  // Get invoices by User ID with caching
  getInvoicesByUserId(userId: number): Observable<any[]> {
    const cachedData = this.invoicesCache$.getValue();
    if (cachedData) {
      return of(cachedData);
    }

    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`).pipe(
      tap((data) => this.invoicesCache$.next(data)),
      catchError(this.handleError)
    );
  }

  // Get invoices by Purchase Order ID
  getInvoicesByPurchaseOrderId(purchaseOrderId: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/purchase-order/${purchaseOrderId}`)
      .pipe(catchError(this.handleError));
  }

  // Update invoice by ID
  updateInvoice(id: number, invoiceData: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/${id}`, invoiceData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(catchError(this.handleError));
  }

  // Delete invoice by ID
  deleteInvoice(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    console.error('Error in InvoiceService:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}
