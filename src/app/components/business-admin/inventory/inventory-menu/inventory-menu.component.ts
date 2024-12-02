import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { InventoryProductDetailsComponent } from '../inventory-product-details/inventory-product-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inventory-menu',
  templateUrl: './inventory-menu.component.html',
  styleUrls: ['./inventory-menu.component.css']
})
export class InventoryMenuComponent {
  public data: any[] = [];
  searchTerm: string = ''; 
  selectedView: 'cardview' | 'listview' = 'listview';

  constructor(private dataService: DataService, private router: Router,
    public dialog: MatDialog 

  ) {}

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
