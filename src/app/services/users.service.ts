import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}/user`;  // Base API URL for user-related endpoints

  constructor(private http: HttpClient) { }

  // Method to retrieve all users
  findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Method to retrieve a user by ID
  findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Method to create a new user
  create(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Method to update an existing user
  update(id: number, user: Partial<User>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, user);
  }

  // Method to delete a user by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
