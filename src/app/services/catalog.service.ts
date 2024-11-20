import { Injectable } from '@angular/core';
import { Catalog } from '../models/catalog.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private apiUrl = `${environment.apiUrl}/catalog`;  // Base API URL for Catalog-related endpoints

  constructor(private http: HttpClient) { }

  // Method to retrieve all Catalog items
  findAll(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(this.apiUrl);
  }

  // Method to retrieve an Catalog item by ID
  findById(id: number): Observable<Catalog> {
    return this.http.get<Catalog>(`${this.apiUrl}/${id}`);
  }

  // Method to create a new Catalog item
  create(Catalog: Partial<Catalog>, file: File): Observable<Catalog> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('CatalogItem', JSON.stringify(Catalog));

    return this.http.post<Catalog>(this.apiUrl, formData);
  }

  // Method to update an existing Catalog item
  update(id: number, Catalog: Partial<Catalog>, file: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('CatalogItem', JSON.stringify(Catalog));

    return this.http.put<void>(`${this.apiUrl}/${id}`, formData);
  }

  // Method to delete an Catalog item by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
