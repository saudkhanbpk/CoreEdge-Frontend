import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApprovalsDetailsComponent } from '../approvals-details/approvals-details.component';

@Component({
  selector: 'app-approved-rma-requests',
  templateUrl: './approved-rma-requests.component.html',
  styleUrls: ['./approved-rma-requests.component.css'],
})
export class ApprovedRmaRequestsComponent {
  currentPage = 1;
  itemsPerPage = 5;
  // expandedIndex: number | null = null;
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
      address: 'Las Vegas',
      status: 'Approved'
      // productdetails: [
      //   {
      //     name: 'Items Requested',
      //     items: [
      //       {
      //         itemname: 'Monitor',
      //         qty: 2,
      //         price: 500,
      //         reason:
      //           'Broken Screen jksd kajhdajkl klajdkljhafklj lakjsdlfkjslk',
      //       },
      //       {
      //         itemname: 'Keyboard',
      //         qty: 1,
      //         price: 15,
      //         reason: 'return this order',
      //       },
      //     ],
      //   },
      // ],
    },
  ];

  // toggleDetails(index: number) {
  //   this.expandedIndex = this.expandedIndex === index ? null : index;
  // }

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

  openDialog(){
    const dialogRef = this.dialog.open(ApprovalsDetailsComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
