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
  constructor(    private authService: AuthService,
    private vendorService: VendorsService,
    private router: Router


  ) { }
  ngOnInit(): void {
    const user = this.authService.getUserData();
    this.loadRoles(user.id);
  }

  loadRoles(userId: number) {
    this.vendorService.findAll(userId).subscribe((response: any) => {
      this.vendors = response; 
      this.totalItems = response.length; 
    });
  }
  // vendors = [
  //   {
  //     id: 1,
  //     name: 'ABC Supplies',
  //     imageUrl: '../../../../../assets/icons/WhatsApp Image 2024-09-09 at 14.31.00_f9483b72.jpg',
  //     contactPerson: 'John Doe',
  //     email: 'john@abc.com',
  //     password: 'password.123',
  //     phone: '123-456-7890',
  //     address: '123 Main St, City, Country',
  //     status: 'Active',

  //     dateJoined: new Date('2023-01-15'),
  //     website: 'https://www.abc.com'
  //   },
  //   {
  //     id: 2,
  //     name: 'XYZ Traders',
  //     imageUrl: '../../../../../assets/icons/WhatsApp Image 2024-09-09 at 14.31.00_f9483b72.jpg',
  //     contactPerson: 'Jane Smith',
  //     email: 'jane@xyztraders.com',
  //     password: 'password.123',
  //     phone: '987-654-3210',
  //     address: '456 Market Ave, City, Country',
  //     status: 'Inactive',
  //     dateJoined: new Date('2022-07-22'),
  //     website: 'https://www.xyztraders.com'
  //   },
  //   {
  //     id: 3,
  //     name: 'ABC Supplies',
  //     imageUrl: '../../../../../assets/icons/WhatsApp Image 2024-09-09 at 14.31.00_f9483b72.jpg',
  //     contactPerson: 'John Doe',
  //     email: 'john@abc.com',
  //     password: 'password.123',
  //     phone: '123-456-7890',
  //     address: '123 Main St, City, Country',
  //     status: 'Active',

  //     dateJoined: new Date('2023-01-15'),
  //     website: 'https://www.abc.com'
  //   },
  //   {
  //     id: 4,
  //     name: 'XYZ Traders',
  //     imageUrl: '../../../../../assets/icons/WhatsApp Image 2024-09-09 at 14.31.00_f9483b72.jpg',
  //     contactPerson: 'Jane Smith',
  //     email: 'jane@xyztraders.com',
  //     password: 'password.123',
  //     phone: '987-654-3210',
  //     address: '456 Market Ave, City, Country',
  //     status: 'Inactive',
  //     dateJoined: new Date('2022-07-22'),
  //     website: 'https://www.xyztraders.com'
  //   },
  //   {
  //     id: 5,
  //     name: 'ABC Supplies',
  //     imageUrl: '../../../../../assets/icons/WhatsApp Image 2024-09-09 at 14.31.00_f9483b72.jpg',
  //     contactPerson: 'John Doe',
  //     email: 'john@abc.com',
  //     password: 'password.123',
  //     phone: '123-456-7890',
  //     address: '123 Main St, City, Country',
  //     status: 'Active',

  //     dateJoined: new Date('2023-01-15'),
  //     website: 'https://www.abc.com'
  //   },
  //   {
  //     id: 6,
  //     name: 'XYZ Traders',
  //     imageUrl: '../../../../../assets/icons/WhatsApp Image 2024-09-09 at 14.31.00_f9483b72.jpg',
  //     contactPerson: 'Jane Smith',
  //     email: 'jane@xyztraders.com',
  //     password: 'password.123',
  //     phone: '987-654-3210',
  //     address: '456 Market Ave, City, Country',
  //     status: 'Inactive',
  //     dateJoined: new Date('2022-07-22'),
  //     website: 'https://www.xyztraders.com'
  //   },
  //   {
  //     id: 7,
  //     name: 'ABC Supplies',
  //     imageUrl: '../../../../../assets/icons/WhatsApp Image 2024-09-09 at 14.31.00_f9483b72.jpg',
  //     contactPerson: 'John Doe',
  //     email: 'john@abc.com',
  //     password: 'password.123',
  //     phone: '123-456-7890',
  //     address: '123 Main St, City, Country',
  //     status: 'Active',

  //     dateJoined: new Date('2023-01-15'),
  //     website: 'https://www.abc.com'
  //   },
  //   {
  //     id: 8,
  //     name: 'XYZ Traders',
  //     imageUrl: '../../../../../assets/icons/WhatsApp Image 2024-09-09 at 14.31.00_f9483b72.jpg',
  //     contactPerson: 'Jane Smith',
  //     email: 'jane@xyztraders.com',
  //     password: 'password.123',
  //     phone: '987-654-3210',
  //     address: '456 Market Ave, City, Country',
  //     status: 'Inactive',
  //     dateJoined: new Date('2022-07-22'),
  //     website: 'https://www.xyztraders.com'
  //   },
  // ];


  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  get totalPages() {
    return Math.ceil(this.vendors.length / this.itemsPerPage);
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.vendors.slice(startIndex, startIndex + this.itemsPerPage);
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
