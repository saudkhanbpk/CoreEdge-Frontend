import { Component, inject } from '@angular/core';
import { ViewRmaRequestComponent } from '../view-rma-request/view-rma-request.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-rma-requests-table',
  templateUrl: './rma-requests-table.component.html',
  styleUrls: ['./rma-requests-table.component.css']
})
export class RmaRequestsTableComponent {
  currentPage = 1;
  itemsPerPage = 5;
  expandedIndex: number | null = null;
  // data:any;
  readonly dialog = inject(MatDialog);
  constructor() {}
  ngOnInit(): void {}

  data = [
    {
      rmano: '001',
      employeename: 'Saad Khan',
      employeeemail: 'employeeemail@gmail.com',
      vendorName: 'Dell Monitor',
      requesteddate: 'October 3rd, 2024',
      returndate: 'October 5th, 2024',
      totalamount: '3500',
      address: 'Las Vegas',
      status:'Onhold',
      productdetails: [
        {
          name: 'Items Requested',
          items: [
            {
              itemname: 'Monitor',
              qty: 2,
              price: 500,
              reason:
                'Broken Screen jksd kajhdajkl klajdkljhafklj lakjsdlfkjslk',
            },
            {
              itemname: 'Keyboard',
              qty: 1,
              price: 15,
              reason: 'return this order',
            },
          ],
        },
      ],
    },
    {
      rmano: '002',
      employeename: 'Ali Ahmed',
      employeeemail: 'ali.ahmed@gmail.com',
      vendorName: 'HP Laptop',
      requesteddate: 'October 10th, 2024',
      returndate: 'October 15th, 2024',
      totalamount: '5000',
      address: 'New York',
      status:'PENDING',
      productdetails: [
        {
          name: 'Items Requested',
          items: [
            {
              itemname: 'Laptop',
              qty: 1,
              price: 4500,
              reason: 'Battery issue and poor performance',
            },
            {
              itemname: 'Charger',
              qty: 1,
              price: 500,
              reason: 'Defective product',
            },
          ],
        },
      ],
    },
    {
      rmano: '003',
      employeename: 'Fatima Ali',
      employeeemail: 'fatima.ali@gmail.com',
      vendorName: 'Apple Store',
      requesteddate: 'October 20th, 2024',
      returndate: 'October 25th, 2024',
      totalamount: '8500',
      address: 'San Francisco',
      status:'Ready',
      productdetails: [
        {
          name: 'Items Requested',
          items: [
            {
              itemname: 'iPhone',
              qty: 1,
              price: 8000,
              reason: 'Not functioning as expected',
            },
            {
              itemname: 'AirPods',
              qty: 1,
              price: 500,
              reason: 'Product damaged during delivery',
            },
          ],
        },
      ],
    },
    {
      rmano: '004',
      employeename: 'John Doe',
      employeeemail: 'john.doe@gmail.com',
      vendorName: 'Samsung Store',
      requesteddate: 'November 1st, 2024',
      returndate: 'November 5th, 2024',
      totalamount: '6000',
      address: 'Los Angeles',
      status:'Onhold',
      productdetails: [
        {
          name: 'Items Requested',
          items: [
            {
              itemname: 'Tablet',
              qty: 1,
              price: 5500,
              reason: 'Screen flickering issue',
            },
            {
              itemname: 'Cover',
              qty: 1,
              price: 500,
              reason: 'Does not fit the tablet model',
            },
          ],
        },
      ],
    },
    {
      rmano: '005',
      employeename: 'Zara Khan',
      employeeemail: 'zara.khan@gmail.com',
      vendorName: 'Sony Electronics',
      requesteddate: 'November 8th, 2024',
      returndate: 'November 12th, 2024',
      totalamount: '4500',
      address: 'Houston',
      status:'PENDING',
      productdetails: [
        {
          name: 'Items Requested',
          items: [
            {
              itemname: 'Camera',
              qty: 1,
              price: 4000,
              reason: 'Lens is not functioning properly',
            },
            {
              itemname: 'Memory Card',
              qty: 1,
              price: 500,
              reason: 'Not compatible with the camera',
            },
          ],
        },
      ],
    },
  ];

  openDialog(item:any) {
    const dialogRef = this.dialog.open(ViewRmaRequestComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  get totalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.data.slice(startIndex, startIndex + this.itemsPerPage);
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
