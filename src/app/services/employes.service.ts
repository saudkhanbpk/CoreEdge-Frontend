import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployesService {
  private apiUrl = `${environment.apiUrl}/employee`;  // Base API URL for employee-related endpoints

  constructor(private http: HttpClient) { }

  // Method to retrieve all employees
  findAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  // Method to retrieve an employee by ID
  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  // Method to create a new employee
  create(employee: Partial<Employee>): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  // Method to update an existing employee
  update(id: number, employee: Partial<Employee>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, employee);
  }

  // Method to delete an employee by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}