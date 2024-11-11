import { Component } from '@angular/core';

@Component({
  selector: 'app-vendors-table',
  templateUrl: './vendors-table.component.html',
  styleUrls: ['./vendors-table.component.css']
})
export class VendorsTableComponent {
  currentPage = 1;
  itemsPerPage = 10; // Number of orders per page
  expandedIndex: number | null = null;
  constructor() { }
  ngOnInit(): void {
    console.log("this is data", this.vendors)
  }
  vendors = [
    {
      id: 1,
      name: 'ABC Supplies',
      logoUrl: '../../../../../assets/icons/WhatsApp Image 2024-09-09 at 14.31.00_f9483b72.jpg',
      contactPerson: 'John Doe',
      email: 'john@abc.com',
      password: 'password.123',
      phone: '123-456-7890',
      address: '123 Main St, City, Country',
      status: 'Active',

      dateJoined: new Date('2023-01-15'),
      website: 'https://www.abc.com'
    },
    {
      id: 2,
      name: 'XYZ Traders',
      logoUrl: '../../../../../assets/icons/WhatsApp Image 2024-09-09 at 14.31.00_f9483b72.jpg',
      contactPerson: 'Jane Smith',
      email: 'jane@xyztraders.com',
      password: 'password.123',
      phone: '987-654-3210',
      address: '456 Market Ave, City, Country',
      status: 'Inactive',
      dateJoined: new Date('2022-07-22'),
      website: 'https://www.xyztraders.com'
    },
    {
      id: 3,
      name: 'ABC Supplies',
      logoUrl: '../../../../../assets/icons/WhatsApp Image 2024-09-09 at 14.31.00_f9483b72.jpg',
      contactPerson: 'John Doe',
      email: 'john@abc.com',
      password: 'password.123',
      phone: '123-456-7890',
      address: '123 Main St, City, Country',
      status: 'Active',

      dateJoined: new Date('2023-01-15'),
      website: 'https://www.abc.com'
    },
    {
      id: 4,
      name: 'XYZ Traders',
      logoUrl: '../../../../../assets/icons/WhatsApp Image 2024-09-09 at 14.31.00_f9483b72.jpg',
      contactPerson: 'Jane Smith',
      email: 'jane@xyztraders.com',
      password: 'password.123',
      phone: '987-654-3210',
      address: '456 Market Ave, City, Country',
      status: 'Inactive',
      dateJoined: new Date('2022-07-22'),
      website: 'https://www.xyztraders.com'
    },
    {
      id: 5,
      name: 'ABC Supplies',
      logoUrl: '../../../../../assets/icons/WhatsApp Image 2024-09-09 at 14.31.00_f9483b72.jpg',
      contactPerson: 'John Doe',
      email: 'john@abc.com',
      password: 'password.123',
      phone: '123-456-7890',
      address: '123 Main St, City, Country',
      status: 'Active',

      dateJoined: new Date('2023-01-15'),
      website: 'https://www.abc.com'
    },
    {
      id: 6,
      name: 'XYZ Traders',
      logoUrl: '../../../../../assets/icons/WhatsApp Image 2024-09-09 at 14.31.00_f9483b72.jpg',
      contactPerson: 'Jane Smith',
      email: 'jane@xyztraders.com',
      password: 'password.123',
      phone: '987-654-3210',
      address: '456 Market Ave, City, Country',
      status: 'Inactive',
      dateJoined: new Date('2022-07-22'),
      website: 'https://www.xyztraders.com'
    },
    {
      id: 7,
      name: 'ABC Supplies',
      logoUrl: '../../../../../assets/icons/WhatsApp Image 2024-09-09 at 14.31.00_f9483b72.jpg',
      contactPerson: 'John Doe',
      email: 'john@abc.com',
      password: 'password.123',
      phone: '123-456-7890',
      address: '123 Main St, City, Country',
      status: 'Active',

      dateJoined: new Date('2023-01-15'),
      website: 'https://www.abc.com'
    },
    {
      id: 8,
      name: 'XYZ Traders',
      logoUrl: '../../../../../assets/icons/WhatsApp Image 2024-09-09 at 14.31.00_f9483b72.jpg',
      contactPerson: 'Jane Smith',
      email: 'jane@xyztraders.com',
      password: 'password.123',
      phone: '987-654-3210',
      address: '456 Market Ave, City, Country',
      status: 'Inactive',
      dateJoined: new Date('2022-07-22'),
      website: 'https://www.xyztraders.com'
    },
  ];


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
