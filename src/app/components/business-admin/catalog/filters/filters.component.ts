import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  categories: string[] = [];
  manufacturer: string[] = [];
  showMoreCategories: boolean = false;
  showMoreManufacturers: boolean = false;
  categorySearch: string = ''; 
  manufacturerSearch: string = '';
  selectedManufacturers: string[] = [];
  selectMoreCategories: string[]=[];
  constructor(private dataService: DataService, private filterService: FilterService) {}
  ngOnInit(): void {
    this.dataService.getData().subscribe(
      (res: any[]) => {
        const allCategories = res.map(item => item.Category);
        this.categories = [...new Set(allCategories)];
        const allManufacturers = res.map(item => item.ManufacturerName);
        this.manufacturer = [...new Set(allManufacturers)];
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  toggleInStock(event: any) {
    const isChecked = event.target.checked;
    this.filterService.setInStock(isChecked);
  }
  filteredCategories(): string[] {
    const filtered = this.categories.filter(category => 
      category.toLowerCase().includes(this.categorySearch.toLowerCase())
    );
    return this.showMoreCategories ? filtered : filtered.slice(0, 8); 
  }
  filteredManufacturers(): string[] {
    const filtered = this.manufacturer.filter(manufacturer => 
      manufacturer.toLowerCase().includes(this.manufacturerSearch.toLowerCase())
    );
    return this.showMoreManufacturers ? filtered : filtered.slice(0, 8); 
  }
  showAllCategories(): void {
    this.showMoreCategories = !this.showMoreCategories;
  }
  showAllManufacturers(): void {
    this.showMoreManufacturers = !this.showMoreManufacturers;
  }
  toggleManufacturerSelection(event: any, manufacturer: string) {
    if (event.target.checked) {
      this.selectedManufacturers.push(manufacturer);
    } else {
      this.selectedManufacturers = this.selectedManufacturers.filter(item => item !== manufacturer);
    }
    this.filterService.setSelectedManufacturers(this.selectedManufacturers);
  }
  toggleCategoriesSelection(event: any, categories: string) {
    if (event.target.checked) {
      this.selectMoreCategories.push(categories);
    } else {
      this.selectMoreCategories = this.selectMoreCategories.filter(item => item !== categories);
    }
    this.filterService.setSelectedCategories(this.selectMoreCategories);
  }
}
