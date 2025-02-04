import { Component, inject } from '@angular/core';
import { OrderDetailsDialogComponent } from '../order-details-dialog/order-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-returned-order-table',
  templateUrl: './returned-order-table.component.html',
  styleUrls: ['./returned-order-table.component.css']
})
export class ReturnedOrderTableComponent {
 currentPage = 1;
  itemsPerPage = 10;
  expandedIndex: number | null = null;
  readonly dialog = inject(MatDialog);
  constructor() {}
  ngOnInit(): void {}

  data = [
    {
      rmano: '001',
      purchaseorderno: 'DFD-445-X45',
      returndate: 'October 5th, 2024',
      totalamount: '3500',
      status: 'Pending',
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
      purchaseorderno: 'DFD-445-X45',
      returndate: 'October 15th, 2024',
      totalamount: '5000',
      status: 'Pending',
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
      purchaseorderno: 'DFD-445-X45',
      returndate: 'October 25th, 2024',
      totalamount: '8500',
      status: 'Resolved',
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
      purchaseorderno: 'DFD-445-X45',
      returndate: 'November 5th, 2024',
      totalamount: '6000',
      status: 'Resolved',
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
      purchaseorderno: 'DFD-445-X45',
      returndate: 'November 12th, 2024',
      totalamount: '4500',
      status: 'Resolved',
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

  openDialog() {
    const dialogRef = this.dialog.open(OrderDetailsDialogComponent);

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
