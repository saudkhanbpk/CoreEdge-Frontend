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
  loading:boolean = true
  currentPage = 1;
  vendors: any[] = []; // Initialize as an empty array
  filteredData: any[] = [];
  itemsPerPage = 10; // Number of vendors per page
  expandedIndex: number | null = null;
  totalItems: number = 0; 
  searchTerm = ''; // Corrected variable name to match usage

  constructor(
    private authService: AuthService,
    private vendorService: VendorsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadVendors(); // Changed method name for clarity
  }

  loadVendors() {
    this.loading = true
    this.vendorService.findAll().subscribe({
      next: (data) => {
        this.vendors = data;
        this.totalItems = data.length; 
        this.filteredData = data; // Initialize filteredData with all vendors
        if (this.filteredData) {
          this.loading= false
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  onInputChange(event: any) {
    this.searchTerm = event.target.value; // Update the searchTerm variable
    if (this.searchTerm) {
      this.filteredData = this.vendors.filter((vendor: any) =>
        vendor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        vendor.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredData = this.vendors; // Reset to all vendors if search term is empty
    }
    this.currentPage = 1; // Reset to the first page when filtering
  }

  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  get totalPages() {
    return Math.ceil(this.filteredData.length / this.itemsPerPage); // Use filteredData for total pages
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
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
        this.vendorService.delete(vendor.id).subscribe(() => {
          this.loadVendors(); // Reload data after deletion
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