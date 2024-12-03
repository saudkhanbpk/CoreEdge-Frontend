import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent {
  showDisputeOptions: boolean = false;
  masterCheckboxChecked: boolean = false;
  isLoading: boolean = false; // State for spinner
  isPaid: boolean = false;    // State to check if paid
  showDisputeSection: boolean = false; // Flag to show/hide dispute section
  disputeSubmitted: boolean = false; // Flag to toggle button text
  purchasedItems = [
    { name: 'Desktop Monitor', quantity: 1, unitPrice: 150, price: 150, checked: false },
  ]
  openDispute(): void {
    this.showDisputeOptions = true;
  }
  cancelDispute(): void {
    this.showDisputeOptions = false;
  }
  get subtotal() {
    return this.purchasedItems.reduce((sum, item) => sum + item.price, 0);
  }
  // Toggle all checkboxes
  toggleAllCheckboxes(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.purchasedItems.forEach(item => {
      item.checked = isChecked;
    });
  }
}
