import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private inStockSubject = new BehaviorSubject<boolean>(false);
  inStock$ = this.inStockSubject.asObservable();

  private selectedManufacturersSubject = new BehaviorSubject<string[]>([]);
  selectedManufacturers$ = this.selectedManufacturersSubject.asObservable();

  private selectedCategoriesSubject = new BehaviorSubject<string[]>([]);
  selectedcategories$ = this.selectedCategoriesSubject.asObservable();

  setInStock(value: boolean) {
    this.inStockSubject.next(value);
  }

  setSelectedManufacturers(manufacturers: string[]) {
    this.selectedManufacturersSubject.next(manufacturers);
  }

  setSelectedCategories(categories: string[]) {
    this.selectedCategoriesSubject.next(categories);
  }
}
