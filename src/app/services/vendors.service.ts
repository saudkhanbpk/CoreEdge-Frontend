import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Vendor } from '../models/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {
  private apiUrl = `${environment.apiUrl}/vendor`;  // Base API URL for vendor-related endpoints

  constructor(private http: HttpClient) {}

  // Method to retrieve all vendors for a specific user
  findAll(userId: number): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.apiUrl}/${userId}`)
      .pipe(
        catchError(this.handleError)  // Error handling
      );
  }

  // Method to retrieve a vendor by ID
  findById(id: number): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)  // Error handling
      );
  }


  // Method to create a new vendor with optional file upload
  createVendor(formData: FormData): Observable<Vendor> {
    return this.http.post<Vendor>(this.apiUrl, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Method to update an existing vendor with optional file upload
  // updateVendor(id: number, vendor: Partial<Vendor>, file?: File): Observable<Vendor> {
  //   const formData = new FormData();
  //   formData.append('vendor', JSON.stringify(vendor)); // Add vendor data to form
  //   if (file) {
  //     formData.append('file', file); // Add file if present
  //   }

  //   return this.http.put<Vendor>(`${this.apiUrl}/${id}`, formData)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }


  updateVendor(id: number, vendor: any, file?: File): Observable<Vendor> {
    const formData = new FormData();
  
    // Iterate over each key in the vendor object and append it directly to formData
    Object.keys(vendor).forEach((key) => {
      if (vendor[key] !== null && vendor[key] !== undefined) {
        formData.append(key, vendor[key] as any); // Append each vendor key-value to formData
      }
    });
  
    // Append the file if it's present
    if (file) {
      formData.append('file', file);
    }
  
    // Send the PUT request with the formData
    return this.http.put<Vendor>(`${this.apiUrl}/${id}`, formData)
      .pipe(
        catchError(this.handleError) // Handle any errors
      );
  }
  


  // Method to delete a vendor by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)  // Error handling
      );
  }

  // Error handler to catch and process errors from the server
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
