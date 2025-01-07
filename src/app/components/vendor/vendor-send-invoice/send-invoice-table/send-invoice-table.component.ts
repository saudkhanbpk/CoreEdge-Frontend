import { Component } from '@angular/core';

@Component({
  selector: 'app-send-invoice-table',
  templateUrl: './send-invoice-table.component.html',
  styleUrls: ['./send-invoice-table.component.css']
})
export class SendInvoiceTableComponent {
  // Sample invoice data to display in the table
  invoiceData: any[] = [
    {
      invoicenumber: 'INV-2025001',
      purchaseorderno:'PuOr-32323',
      businessname: 'ABC Supplies Co.',
      businessemail: 'contact@abc.com',
      receiveddate: '2025-01-05',
      totalamount: 1200,
      address: '123 Market Street, NY 10001',
      status: 'Paid'
    },
    {
      invoicenumber: 'INV-2025002',
      purchaseorderno:'PuOr-32323',
      businessname: 'XYZ Corporation',
      businessemail: 'procurement@xyz.com',
      receiveddate: '2025-01-06',
      totalamount: 1500,
      address: '456 Elm Avenue, CA 90210',
      status: 'Pending'
    }
    // Add more invoice data as needed
  ];

  // Pagination variables
  currentPage: number = 1;
  totalPages: number = 3; // Total pages based on the data length and items per page
  itemsPerPage: number = 5;

  constructor() { }

  ngOnInit(): void {
    // Any initialization logic if needed
  }

  // Pagination methods
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  isPreviousPageAvailable(): boolean {
    return this.currentPage > 1;
  }

  isNextPageAvailable(): boolean {
    return this.currentPage < this.totalPages;
  }
}
