import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUrl = `${environment.apiUrl}/roles`;  // Base API URL for role-related endpoints

  constructor(private http: HttpClient) { }

  // Method to retrieve all roles
  findAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl);
  }

  // Method to retrieve a role by ID
  findById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/${id}`);
  }

  // Method to create a new role
  create(role: Partial<Role>): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, role);
  }

  // Method to update an existing role
  update(id: number, role: Partial<Role>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, role);
  }

  // Method to delete a role by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}