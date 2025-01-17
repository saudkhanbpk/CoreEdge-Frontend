import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { ClearOrderPoppComponent } from '../clear-order-popp/clear-order-popp.component';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.css']
})
export class ReviewOrderComponent {
    readonly dialog = inject(MatDialog)
    selectedOrder: any;
  isEditing: boolean = false;
  loading:boolean =true
  tableData = [
    { name: 'Desktop Monitor', orderQuantity: 1, receivedQuantity: 1, brokenQuantity: 0, wrongItemQuantity: 0, checked: false },
    // Add more rows as needed
  ];
  allChecked = false; // Tracks the "Select All" checkbox state
  isAnyCheckboxChecked = false; // Tracks if any checkbox is selected
  
  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true
    this.selectedOrder = this.sharedService.getSelectedOrder();
    if (this.selectedOrder) {
      this.loading = false
    }
    console.log('Selected Order:', this.selectedOrder);
    if (!this.selectedOrder) {
      console.error('No order found. Redirecting back to the orders page.');
      this.router.navigate(['/business-admin/receiving']);
    }
  }
  

  // Triggered when any individual checkbox is toggled
  onCheckboxChange() {
    this.isAnyCheckboxChecked = this.tableData.some(item => item.checked);
    this.allChecked = this.tableData.every(item => item.checked);
  }

  // Toggles all checkboxes when the "Select All" checkbox is toggled
  toggleAllCheckboxes(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.tableData.forEach(item => (item.checked = isChecked));
    this.isAnyCheckboxChecked = isChecked;
  }
  currentEditingItem: any = null; // To track the currently editing item

  toggleEdit(item: any, index: number) {
    if (this.currentEditingItem === item) {
      this.currentEditingItem = null; 
      this.isEditing = false;
    } else {
      this.currentEditingItem = item;
      this.isEditing = true;
  
      if (!this.selectedOrder || !this.selectedOrder.products) {
        this.selectedOrder = { products: [] }; 
      }
  
      const product = this.selectedOrder.products[index];
  
      if (product) {
        product.receivedQuantity = item.receivedQuantity;
        product.brokenQuantity = item.brokenQuantity;
        product.wrongItemQuantity = item.wrongItemQuantity;
        product.note = item.note;  
      } else {
        this.selectedOrder.products[index] = {
          receivedQuantity: item.receivedQuantity,
          brokenQuantity: item.brokenQuantity,
          wrongItemQuantity: item.wrongItemQuantity,
          note: item.note,  
        };
      }
    }
  
    console.log("Currently editing item:", this.currentEditingItem);
    console.log("Updated selectedOrder:", this.selectedOrder);
  }
  
  updateReport() {
    const index = this.selectedOrder.products.findIndex((product:any) => product === this.currentEditingItem);
  
    if (index !== -1) {
      this.selectedOrder.products[index] = {
        ...this.selectedOrder.products[index],  
        receivedQuantity: this.currentEditingItem.receivedQuantity,
        brokenQuantity: this.currentEditingItem.brokenQuantity,
        wrongItemQuantity: this.currentEditingItem.wrongItemQuantity,
        note: this.currentEditingItem.note
      };
    }
  
    console.log("Updated selectedOrder:", this.selectedOrder);
  }

   openDialog(){
      this.dialog.open(ClearOrderPoppComponent, {
        width:'auto'
      })
    }
}

