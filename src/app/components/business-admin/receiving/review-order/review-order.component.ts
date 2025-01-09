import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.css']
})
export class ReviewOrderComponent implements OnInit {
  selectedOrder: any;
  isEditing: boolean = false;

  tableData = [
    { name: 'Desktop Monitor', orderQuantity: 1, receivedQuantity: 1, brokenQuantity: 0, wrongItemQuantity: 0, checked: false },
    // Add more rows as needed
  ];
  allChecked = false; // Tracks the "Select All" checkbox state
  isAnyCheckboxChecked = false; // Tracks if any checkbox is selected
  
  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.selectedOrder = this.sharedService.getSelectedOrder();
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
  toggleEdit(item: any) {
    this.isEditing = !this.isEditing;
    console.log("item" , item)
    // If editing an item, assign its values to the selectedOrder fields
  this.selectedOrder.receivedQuantity = item.quantity;
  this.selectedOrder.brokenQuantity = item.quantity;
  this.selectedOrder.wrongItemQuantity = item.quantity;
}

}

