import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-invoice-table',
  templateUrl: './send-invoice-table.component.html',
  styleUrls: ['./send-invoice-table.component.css']
})
export class SendInvoiceTableComponent implements OnInit {
  loading:boolean = false
  invoices: any = []; 
  displayedInvoices: any = []; 
  user: any;
  currentPage: number = 1;
  totalPages: number = 1; 
  totalInvoices: number = 0;
  itemsPerPage: number = 5; 
  filteredData: any = [];
  selectedSortOption:any='';  

  constructor(private invoiceService: InvoiceService, private authService: AuthService , private router:Router) {}

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.loading = true
    this.invoiceService.getInvoicesByVendorId(this.user.id).subscribe(
      (data: any) => { 
        this.invoices = data;
        this.filteredData = this.invoices
        if (this.invoices) {
          this.loading = false
        }
        this.totalInvoices = data.length; 
        this.totalPages = Math.ceil(this.totalInvoices / this.itemsPerPage); 
        this.updateDisplayedInvoices(); 
      },
      (error) => {
        console.error('Error loading invoices', error);
      }
    );
  }

  onInputChange(event: any) {
    const searchTerm = event.target.value; // Update the searchTerm variable
    if (searchTerm) {
      this.filteredData = this.invoices.filter((item: any) =>
        item?.user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.user?.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredData = this.invoices; // Reset to all vendors if search term is empty
    }
    this.currentPage = 1; // Reset to the first page when filtering
  }
  sortData() {
    console.log("this ", this.selectedSortOption)
    if (this.selectedSortOption === 'name') {
      this.filteredData.sort((a: any, b: any) =>
        a?.user?.fullName.localeCompare(b.user?.fullName)
      );
    } else if (this.selectedSortOption === 'date') {
      this.filteredData.sort(
        (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

    }
  }


  updateDisplayedInvoices(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedInvoices = this.filteredData.slice(startIndex, endIndex);
  }  
  deleteInvoice(item: any) {
    // Show a confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed to delete the innvoice
        this.invoiceService.deleteInvoice(item.id).subscribe({
          next: (res: any) => {
              // Update the invoices array after deletion
              this.filteredData = this.invoices.filter((i: any) => i.id !== item.id);
            // Show success feedback
            Swal.fire(
              'Deleted!',
              'The Invoice has been successfully deleted.',
              'success'
            );
          },
          error: (err: any) => {
            // Show error feedback
            Swal.fire(
              'Error!',
              'An error occurred while deleting the Invoice. Please try again.',
              'error'
            );
          }
        });
      }
    });
  }

  viewInvoice(item:any){
  this.invoiceService.sendAndGetInvoceData(item)
  this.router.navigate(['/vendor/vendor-invoice/send-invoice-details'])
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
