import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployesService {
  private apiUrl = `${environment.apiUrl}/employee`;  // Base API URL for employee-related endpoints

  constructor(private http: HttpClient) {}

  // Method to retrieve all employees
  findAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)  // Error handling
      );
  }

  // Method to retrieve an employee by ID
  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)  // Error handling
      );
  }

  // Method to create a new employee
  createEmployee(employee: Partial<any>): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee)
      .pipe(
        catchError(this.handleError)  // Error handling
      );
  }

  // Method to update an existing employee with optional file upload
  updateEmployee(id: number, employee: any, file?: File): Observable<Employee> {
    const formData = new FormData();

    // Iterate over each key in the employee object and append it directly to formData
    Object.keys(employee).forEach((key) => {
      if (employee[key] !== null && employee[key] !== undefined) {
        formData.append(key, employee[key] as any); // Append each employee key-value to formData
      }
    });

    // Append the file if it's present
    if (file) {
      formData.append('file', file);
    }

    // Send the PUT request with the formData
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, formData)
      .pipe(
        catchError(this.handleError)  // Handle any errors
      );
  }

  // Method to delete an employee by ID
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
