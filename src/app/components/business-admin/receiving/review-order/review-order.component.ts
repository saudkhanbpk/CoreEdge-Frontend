import { Component } from '@angular/core';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.css']
})
export class ReviewOrderComponent {
  tableData = [
    { name: 'Desktop Monitor', orderQuantity: 1, receivedQuantity: 1, brokenQuantity: 0, wrongItemQuantity: 0, checked: false },
    // Add more rows as needed
  ];
  allChecked = false; // Tracks the "Select All" checkbox state
  isAnyCheckboxChecked = false; // Tracks if any checkbox is selected

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
}
