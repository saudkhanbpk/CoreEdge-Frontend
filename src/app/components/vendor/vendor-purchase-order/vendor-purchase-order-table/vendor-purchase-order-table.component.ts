// import { Component, inject } from '@angular/core';
// import { VendorViewPurchaseOrderComponent } from '../vendor-view-purchase-order/vendor-view-purchase-order.component';
// import { MatDialog } from '@angular/material/dialog';
// import { PurchaseOrderService } from 'src/app/services/purchase-order.service';

// @Component({
//   selector: 'app-vendor-purchase-order-table',
//   templateUrl: './vendor-purchase-order-table.component.html',
//   styleUrls: ['./vendor-purchase-order-table.component.css']
// })
// export class VendorPurchaseOrderTableComponent {
//   currentPage = 1;
//   itemsPerPage = 10;
//   expandedIndex: number | null = null;
//   readonly dialog = inject(MatDialog)
//   data:any;
//   constructor(private purchaseOrderService: PurchaseOrderService) { }
//   ngOnInit(): void {
//   this.purchaseOrderService.findVendorOrders().subscribe((data) => {
//       this.data = data;
//     });

//   }

//   // data = [
//   //   {
//   //     purchaseorderno: '2982-XJ82-92',
//   //     businessname: 'Saad Khan',
//   //     businessemail:'businessemail@gmail.com',
//   //     hardwarerequested:'Dell Monitor',
//   //     requesteddate :'October 3rd, 2024',
//   //     receivedddate :'October 5th, 2024',
//   //     totalamount :'3500',
//   //     address:'Las Vegas',
//   //     status:'Ordered',
//   //     checked:false,
//   //     productdetails: [
//   //       {
//   //         name: 'Items Requested', items: [
//   //           { itemname: 'Monitor', price: 5 },
//   //           { itemname: 'Keyboard', price: 15 },
//   //           { itemname: 'Mouse', price: 25 },
//   //           { itemname: 'RAM', price: 35 },
//   //         ]
//   //       }
//   //     ]
//   //   },
//   //   {
//   //     purchaseorderno: '2982-XJ82-92',
//   //     businessname: 'Ihtizaz Ahmad',
//   //     businessemail:'businessemail@gmail.com',
//   //     hardwarerequested:'Dell Monitor',
//   //     requesteddate :'October 3rd, 2024',
//   //     receivedddate :'October 5th, 2024',
//   //     totalamount :'3500',
//   //     address:'Las Vegas',
//   //     status:'Pending',
//   //     checked:false,
//   //     productdetails: [
//   //       {
//   //         name: 'Items Requested', items: [
//   //           { itemname: 'Monitor', price: 5 },
//   //           { itemname: 'Keyboard', price: 15 },
//   //           { itemname: 'Mouse', price: 25 },
//   //           { itemname: 'RAM', price: 35 },
//   //         ]
//   //       }
//   //     ]
//   //   },
//   //   {
//   //     purchaseorderno: '2982-XJ82-92',
//   //     businessname: 'Aamir Shehzad',
//   //     businessemail:'businessemail@gmail.com',
//   //     hardwarerequested:'Dell Monitor',
//   //     requesteddate :'October 3rd, 2024',
//   //     receivedddate :'October 5th, 2024',
//   //     totalamount :'3500',
//   //     address:'Las Vegas',
//   //     status:'Rejected',
//   //     checked:false,
//   //     productdetails: [
//   //       {
//   //         name: 'Items Requested', items: [
//   //           { itemname: 'Monitor', price: 5 },
//   //           { itemname: 'Keyboard', price: 15 },
//   //           { itemname: 'Mouse', price: 25 },
//   //           { itemname: 'RAM', price: 35 },
//   //         ]
//   //       }
//   //     ]
//   //   },
//   // ];
//   toggleAllCheckboxes(event: Event): void {
//     const isChecked = (event.target as HTMLInputElement).checked;
//     this.paginatedData.forEach(item => {
//       item.checked = isChecked;
//     });
//   }
//   toggleDetails(index: number) {
//     this.expandedIndex = this.expandedIndex === index ? null : index;
//   }

//   get totalPages() {
//     return Math.ceil(this.data.length / this.itemsPerPage);
//   }

//   get paginatedData() {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     return this.data.slice(startIndex, startIndex + this.itemsPerPage);
//   }

//   goToPage(page: number) {
//     this.currentPage = page;
//   }

//   nextPage() {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//     }
//   }

//   previousPage() {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//     }
//   }

//   isNextPageAvailable() {
//     return this.currentPage < this.totalPages;
//   }

//   isPreviousPageAvailable() {
//     return this.currentPage > 1;
//   }


//   openDialog(){
//     this.dialog.open(VendorViewPurchaseOrderComponent, {
//       width:'60%'
//     })
//   }
// }


import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';
import { VendorViewPurchaseOrderComponent } from '../vendor-view-purchase-order/vendor-view-purchase-order.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-purchase-order-table',
  templateUrl: './vendor-purchase-order-table.component.html',
  styleUrls: ['./vendor-purchase-order-table.component.css']
})
export class VendorPurchaseOrderTableComponent implements OnInit {
  loading:boolean = false;
  currentPage = 1;
  itemsPerPage = 10;
  expandedIndex: number | null = null;
  data: any[] = []; // Ensuring it's typed as an array
  isLoading: boolean = true; // To handle loading state

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchVendorOrders();
  }

  private fetchVendorOrders(): void {
    this.loading = true;
    this.purchaseOrderService.findVendorOrders().subscribe({
      next: (orders) => {
        this.data = orders;
        console.log("this.data", this.data)
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching vendor orders:', err);
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch vendor orders. Please try again later.',
          footer: err.message || 'An unknown error occurred.',
        });
      }
    });
  }
  

  toggleAllCheckboxes(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.data.forEach((item) => (item.checked = isChecked));
  }

  toggleDetails(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  get totalPages(): number {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  get paginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.data.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  isNextPageAvailable(): boolean {
    return this.currentPage < this.totalPages;
  }

  isPreviousPageAvailable(): boolean {
    return this.currentPage > 1;
  }

  // openDialog(item:any): void {
  //   this.dialog.open(VendorViewPurchaseOrderComponent, {
  //     data:item,
  //     width: '60%'
  //   });

  // }
  openDialog(item: any): void {
    const dialogRef = this.dialog.open(VendorViewPurchaseOrderComponent, {
      data: item,
      width: '60%',
    });
  
    // Subscribe to the afterClosed event
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        // Call fetchVendorOrders() if the dialog returns 'refresh'
        this.fetchVendorOrders();
      }
    });
  }
  

  
    deleterequest(item: any) {
      // Show a confirmation dialog
      Swal.fire({
        title: 'Are you sure?',
        text: 'This action will permanently delete the This Order!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          // Proceed to delete the item
          this.purchaseOrderService.delete(item.id).subscribe({
            next: (res: any) => {
              this.fetchVendorOrders();
              // Show success feedback
              Swal.fire(
                'Deleted!',
                'The Purchase Request has been deleted successfully.',
                'success'
              );
            },
            error: (err: any) => {
              // Show error feedback
              Swal.fire(
                'Error!',
                'Unable to delete the Purchase Request. Please try again.',
                'error'
              );
            }
          });
        }
      });
    }
}
