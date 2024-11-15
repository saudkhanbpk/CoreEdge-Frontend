import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-inventory-menu',
  templateUrl: './inventory-menu.component.html',
  styleUrls: ['./inventory-menu.component.css']
})
export class InventoryMenuComponent {
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
