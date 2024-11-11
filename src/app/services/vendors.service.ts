import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vendor } from '../models/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {
  private apiUrl = `${environment.apiUrl}/vendor`;  // Base API URL for vendor-related endpoints

  constructor(private http: HttpClient) { }

  // Method to retrieve all vendors
  findAll(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.apiUrl);
  }

  // Method to retrieve a vendor by ID
  findById(id: number): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.apiUrl}/${id}`);
  }

  // Method to create a new vendor
  create(vendor: Partial<Vendor>): Observable<Vendor> {
    return this.http.post<Vendor>(this.apiUrl, vendor);
  }

  // Method to update an existing vendor
  update(id: number, vendor: Partial<Vendor>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, vendor);
  }

  // Method to delete a vendor by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}