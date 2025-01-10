import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { VendorsService } from 'src/app/services/vendors.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendors-table',
  templateUrl: './vendors-table.component.html',
  styleUrls: ['./vendors-table.component.css']
})
export class VendorsTableComponent {
  currentPage = 1;
  vendors:any;
  itemsPerPage = 10; // Number of orders per page
  expandedIndex: number | null = null;
  totalItems: number = 0; 
  searchterm = '';
  constructor(    private authService: AuthService,
    private vendorService: VendorsService,
    private router: Router


  ) { }
  ngOnInit(): void {
    this.loadRoles();
  }
  onInputChange(event:any){
  this.searchterm = event.target.value;
  }
  loadRoles() {
    this.vendorService.findAll().subscribe({
      next: (data) => {
        this.vendors = data;
        this.totalItems = data.length; 
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  get totalPages() {
    return Math.ceil(this.vendors.length / this.itemsPerPage);
  }

  get paginatedData() {
    const filteredVendors = this.vendors.filter((vendor:any) =>
      vendor.name.toLowerCase().includes(this.searchterm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(this.searchterm.toLowerCase()) 
    );
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filteredVendors.slice(startIndex, startIndex + this.itemsPerPage);
  }


  goToPage(page: number) {
    this.currentPage = page;
  }

  // Method to handle vendor edit
vendorEdit(vendor: any) {
  this.router.navigate(['/business-admin/vendors/edit-vendors'], { state: { vendorData: vendor } });
}

// Method to handle vendor deletion
vendorDelete(vendor: any) {
  Swal.fire({
    icon: 'success',
    title: 'Vendor Deleted',
    text: `The vendor "${vendor.name}" has been deleted successfully!`,
    confirmButtonText: 'OK',
  }).then((result) => {
    if (result.isConfirmed) {
      this.vendorService.delete(vendor.id).subscribe((response: any) => {
        this.ngOnInit(); // Reload data after deletion
      });
    }
  });
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
