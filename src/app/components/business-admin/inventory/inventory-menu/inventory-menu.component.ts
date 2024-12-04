import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { InventoryProductDetailsComponent } from '../inventory-product-details/inventory-product-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inventory-menu',
  templateUrl: './inventory-menu.component.html',
  styleUrls: ['./inventory-menu.component.css']
})
export class InventoryMenuComponent {
  public inventoryData: any[] = [];
  searchTerm: string = ''; 
  selectedView: 'cardview' | 'listview' = 'listview';


  constructor(private dataService: DataService, private router: Router,
    private inventoryService:InventoryService,
    private authService:AuthService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }
  get filteredData() {
    return this.inventoryData.filter(item => item.materialId.includes(this.searchTerm));
  }
  loadData(): void {
    this.inventoryService.findAll().subscribe((response) => {
      this.inventoryData = response;
      console.log("this is inventory items", this.inventoryData)
    });
  }

  deleteItem(materialId: any): void {
      this.inventoryService.delete(materialId).subscribe(() => {
        this.loadData();
      });
  }
  setView(view: 'cardview' | 'listview') {
    this.selectedView = view;
    console.log('View changed to:', this.selectedView);
  }
  openDialog(item:any) {
    console.log("item touched", item)
    const dialogRef = this.dialog.open(InventoryProductDetailsComponent,{
      data:item
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
