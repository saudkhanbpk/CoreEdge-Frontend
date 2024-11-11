import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Inventory } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = `${environment.apiUrl}/inventory`;  // Base API URL for inventory-related endpoints

  constructor(private http: HttpClient) { }

  // Method to retrieve all inventory items
  findAll(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiUrl);
  }

  // Method to retrieve an inventory item by ID
  findById(id: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.apiUrl}/${id}`);
  }

  // Method to create a new inventory item
  create(inventory: Partial<Inventory>, file: File): Observable<Inventory> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('inventoryItem', JSON.stringify(inventory));

    return this.http.post<Inventory>(this.apiUrl, formData);
  }

  // Method to update an existing inventory item
  update(id: number, inventory: Partial<Inventory>, file: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('inventoryItem', JSON.stringify(inventory));

    return this.http.put<void>(`${this.apiUrl}/${id}`, formData);
  }

  // Method to delete an inventory item by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}