import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.css']
})
export class InvoiceTableComponent {
  currentPage = 1;
  itemsPerPage = 10;
  expandedIndex: number | null = null;
  data: any;
  user: any;
  constructor(private authService: AuthService,
    private invoiceService: InvoiceService,) { }

    ngOnInit(): void {
      this.user = this.authService.getUserData();
      this.loadInvoices();
    }
  
    loadInvoices(): void {
      this.invoiceService.getInvoicesByUserId(this.user.id).subscribe(
        (data: any) => { 
          this.data = data;
        (error:any) => {
          console.error('Error loading invoices', error);
        }
    })
  }
 
  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  get totalPages() {
    return Math.ceil(this.data?.length / this.itemsPerPage);
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.data?.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  isNextPageAvailable() {
    return this.currentPage < this.totalPages;
  }

  isPreviousPageAvailable() {
    return this.currentPage > 1;
  }
}
