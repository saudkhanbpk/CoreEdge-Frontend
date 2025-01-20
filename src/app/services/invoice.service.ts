import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = `${environment.apiUrl}/invoices`; // Assuming environment.ts has the API URL defined

  constructor(private http: HttpClient) {}
  private selectedinvoicessubject = new BehaviorSubject<any[]>([]);
  currentinvoicedata = this.selectedinvoicessubject.asObservable();
  // send the data from send invoice c and get in send-invoice-details c
  sendAndGetInvoceData(term: any) {
    this.selectedinvoicessubject.next(term);
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
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
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

  // Get invoices by User ID
  getInvoicesByUserId(userId: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/user/${userId}`)
      .pipe(catchError(this.handleError));
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
    // Handle error based on status or response
    console.error('An error occurred', error);
    throw error; // You can add more specific error handling logic here
  }
}