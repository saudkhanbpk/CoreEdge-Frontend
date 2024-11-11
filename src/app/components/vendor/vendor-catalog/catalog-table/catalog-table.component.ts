import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-catalog-table',
  templateUrl: './catalog-table.component.html',
  styleUrls: ['./catalog-table.component.css']
})
export class CatalogTableComponent {
  public data: any[] = [];
  searchTerm: string = ''; 

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }
  get filteredData() {
    return this.data.filter(item => item.MaterialId.includes(this.searchTerm));
  }
  loadData(): void {
    this.dataService.getData().subscribe((response) => {
      this.data = response;
    });
  }

  deleteItem(materialId: string): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.dataService.deleteInventoryItem(materialId).subscribe(() => {
        this.loadData();
      });
    }
  }
}
