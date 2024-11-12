  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { environment } from 'src/environments/environment'; // Adjust path as needed
  // import { User } from './user.model';  // Adjust the path for your User model
  // import { SignupDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from './dto';  // Adjust path for DTOs
import { User } from '../models/users.model';
  
  @Injectable({
    providedIn: 'root'
  })
  export class UserService {
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

  // Method for user signup (POST /user/signup)
  signup(user: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, user);
  }

  // Method for user signin (POST /user/signin)
  signin(user: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/signin`, user);
  }

  // Method for forgot password (POST /user/forgot-password)
  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/forgot-password`, { email });
  }

  // Method for resetting password (POST /user/reset-password)
  resetPassword(resetData: { token: string; newPassword: string; confirmPassword: string }): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reset-password`, resetData);
  }

  // Method to update an existing user (PUT /user/:id)
  update(id: number, user: Partial<User>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, user);
  }

  // Method to delete a user (DELETE /user/:id)
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
  