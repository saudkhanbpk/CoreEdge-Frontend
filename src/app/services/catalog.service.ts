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
 
  findByUserId(userId: number): Observable<Catalog> {
    return this.http.get<Catalog>(`${this.apiUrl}/user/${userId}`);
  }

  // Method to create a new Catalog item
  // create(Catalog: Partial<Catalog>, file: File): Observable<Catalog> {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('CatalogItem', JSON.stringify(Catalog));

  //   return this.http.post<Catalog>(this.apiUrl, formData);
  // }

  create(Catalog:any): Observable<Catalog> {
    // const formData = new FormData();
    
    // // Append the file and catalog data
    // if (file) {
    //   formData.append('file', file);
    // }
    // formData.append('CatalogItem', JSON.stringify(Catalog));
  
    return this.http.post<Catalog>(this.apiUrl, Catalog);
  }
  

  // Method to update an existing Catalog item
  updateCatalogItem(id: number, Catalog: Partial<any>): Observable<void> {

    return this.http.put<void>(`${this.apiUrl}/${id}`, Catalog);
  }

  // Method to delete an Catalog item by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
