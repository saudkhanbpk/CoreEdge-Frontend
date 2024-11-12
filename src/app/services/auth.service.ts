import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  // Save the token to localStorage or sessionStorage
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }
  
  // Retrieve the token from storage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  
  saveUserData(userData: any) {
    localStorage.setItem('user', JSON.stringify(userData)); // Serialize the user object
  }

  // Retrieve user data from localStorage
  getUserData() {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData); // Parse the string back into an object
    }
    return null; // Return null if there's no user data
  }

  // Remove user data from localStorage
  clearUserData() {
    localStorage.removeItem('user');
  }

  // Clear the token when logging out
  clearToken(): void {
    localStorage.removeItem('authToken');
  }

  // Check if the user is authenticated by checking if the token exists
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
