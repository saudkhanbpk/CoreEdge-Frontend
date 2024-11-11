import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private jsonUrl = 'assets/fresenius_data.json';  
  private inventoryItems: any[] = [];  

  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    if (this.inventoryItems.length) {
      return of(this.inventoryItems);
    } else {
      return this.http.get<any[]>(this.jsonUrl).pipe(
        map(data => {
          this.inventoryItems = data;  
          return this.inventoryItems;
        })
      );
    }
  }

  getInventoryItem(materialId: string): Observable<any> {
    if (this.inventoryItems.length) {
      const item = this.inventoryItems.find(i => i.MaterialId === materialId);
      return of(item);
    } else {
      return this.getData().pipe(
        map(items => items.find(i => i.MaterialId === materialId))
      );
    }
  }

  getItemsByCategory(category: string): Observable<any[]> {
    return this.getData().pipe(
      map(items => items.filter(item => item.Category === category))
    );
  }

  addInventoryItem(newItem: any): Observable<any> {
    this.inventoryItems.push(newItem); 
    return of(newItem);  
  }

  updateInventoryItem(materialId: string, updatedItem: any): Observable<any> {
    const index = this.inventoryItems.findIndex(i => i.MaterialId === materialId);
    if (index !== -1) {
      this.inventoryItems[index] = { ...updatedItem, MaterialId: materialId };  
      return of(this.inventoryItems[index]);  
    }
    return of(null);  
  }

  deleteInventoryItem(materialId: string): Observable<any> {
    const index = this.inventoryItems.findIndex(i => i.MaterialId === materialId);
    if (index !== -1) {
      this.inventoryItems.splice(index, 1); 
      return of(true); 
    }
    return of(false); 
  }
}
