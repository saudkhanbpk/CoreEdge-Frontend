import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-inventory-menu',
  templateUrl: './inventory-menu.component.html',
  styleUrls: ['./inventory-menu.component.css']
})
export class InventoryMenuComponent {
  public inventoryData: any[] = [];
  searchTerm: string = ''; 


  constructor(private dataService: DataService, private router: Router,
    private inventoryService:InventoryService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  get filteredData() {
    return this.inventoryData.filter(item => item.materialId.includes(this.searchTerm));
  }
  loadData(): void {
    this.inventoryService.findAll().subscribe((response) => {
      this.inventoryData = response;
    });
  }

  deleteItem(materialId: any): void {
      this.inventoryService.delete(materialId).subscribe(() => {
        this.loadData();
      });
  }
 
}
