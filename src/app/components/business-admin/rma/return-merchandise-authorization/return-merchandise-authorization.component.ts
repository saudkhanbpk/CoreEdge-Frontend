import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewRmaComponent } from '../view-rma/view-rma.component';

// interface ProductDetail {
//   itemname: string;
//   price: number;
//   quantityReturned: number;
//   reason: string;
// }

// interface RMAOrder {
//   rmaNo: string;
//   employeename: string;
//   employeeemail: string;
//   productRequested: string;
//   requesteddate: string;
//   returndate: string;
//   totalamount: number;
//   vendor: string;
//   returnstatus: string;
//   productdetails: ProductDetail[];
//   approvalStatus: boolean;
// }
@Component({
  selector: 'app-return-merchandise-authorization',
  templateUrl: './return-merchandise-authorization.component.html',
  styleUrls: ['./return-merchandise-authorization.component.css']
})
export class ReturnMerchandiseAuthorizationComponent {
  // rmaOrders: RMAOrder[] = [
  //   {
  //     rmaNo: 'RMA-001',
  //     employeename: 'John Doe',
  //     employeeemail: 'john.doe@example.com',
  //     productRequested: 'Dell Laptop',
  //     requesteddate: 'October 10th, 2024',
  //     returndate: 'October 12th, 2024',
  //     totalamount: 1500,
  //     vendor: 'Tech Supplies Inc.',
  //     returnstatus: 'Pending',
  //     productdetails: [
  //       { itemname: 'Laptop', price: 1500, quantityReturned: 1, reason: 'Defective screen' },
  //     ],
  //     approvalStatus: false,
  //   },
  //   {
  //     rmaNo: 'RMA-002',
  //     employeename: 'Jane Smith',
  //     employeeemail: 'jane.smith@example.com',
  //     productRequested: 'Wireless Mouse',
  //     requesteddate: 'October 8th, 2024',
  //     returndate: 'October 10th, 2024',
  //     totalamount: 30,
  //     vendor: 'Accessory Hub',
  //     returnstatus: 'Approved',
  //     productdetails: [
  //       { itemname: 'Mouse', price: 30, quantityReturned: 1, reason: 'Not working' },
  //     ],
  //     approvalStatus: true,
  //   }
  // ];

  // toggleApprovalStatus(order: RMAOrder) {
  //   order.approvalStatus = !order.approvalStatus;
  //   order.returnstatus = order.approvalStatus ? 'Approved' : 'Pending';
  // }
  currentPage = 1;
  itemsPerPage = 10;
  expandedIndex: number | null = null;
  readonly dialog = inject(MatDialog);
  constructor() {}
  ngOnInit(): void {}

  data = [
    {
      rmano: '001',
      employeename: 'Saad Khan',
      employeeemail: 'employeeemail@gmail.com',
      venderName: 'Dell Monitor',
      requesteddate: 'October 3rd, 2024',
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
      employeename: 'Ali Ahmed',
      employeeemail: 'ali.ahmed@gmail.com',
      venderName: 'HP Laptop',
      requesteddate: 'October 10th, 2024',
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
      employeename: 'Fatima Ali',
      employeeemail: 'fatima.ali@gmail.com',
      venderName: 'Apple Store',
      requesteddate: 'October 20th, 2024',
      returndate: 'October 25th, 2024',
      totalamount: '8500',
      status: 'Returned',
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
      venderName: 'Samsung Store',
      requesteddate: 'November 1st, 2024',
      returndate: 'November 5th, 2024',
      totalamount: '6000',
      status: 'Approved',
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
      venderName: 'Sony Electronics',
      requesteddate: 'November 8th, 2024',
      returndate: 'November 12th, 2024',
      totalamount: '4500',
      status: 'Returned',
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
    const dialogRef = this.dialog.open(ViewRmaComponent);

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

