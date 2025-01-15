import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-send-invoice-table',
  templateUrl: './send-invoice-table.component.html',
  styleUrls: ['./send-invoice-table.component.css']
})
export class SendInvoiceTableComponent implements OnInit {

  invoices: any = []; 
  displayedInvoices: any = []; 
  user: any;
  currentPage: number = 1;
  totalPages: number = 1; 
  totalInvoices: number = 0;
  itemsPerPage: number = 5; 

  constructor(private invoiceService: InvoiceService, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.invoiceService.getInvoicesByVendorId(this.user.id).subscribe(
      (data: any) => { 
        this.invoices = data;
        this.totalInvoices = data.length; 
        this.totalPages = Math.ceil(this.totalInvoices / this.itemsPerPage); 
        this.updateDisplayedInvoices(); 
      },
      (error) => {
        console.error('Error loading invoices', error);
      }
    );
  }

  updateDisplayedInvoices(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedInvoices = this.invoices.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedInvoices(); 
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedInvoices();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedInvoices();
    }
  }

  isPreviousPageAvailable(): boolean {
    return this.currentPage > 1;
  }

  isNextPageAvailable(): boolean {
    return this.currentPage < this.totalPages;
  }
}
