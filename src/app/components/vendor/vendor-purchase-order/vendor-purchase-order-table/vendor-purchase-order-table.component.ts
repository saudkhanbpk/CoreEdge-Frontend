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
  filteredData:any=[];
  selectedSortOption:any='';

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
        this.filteredData = this.data;
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

  onInputChange(event: any) {
    const searchTerm = event.target.value; // Update the searchTerm variable
    if (searchTerm) {
      this.filteredData = this.data.filter((item: any) =>
        item?.users[0]?.fullName .toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.users[0]?.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item?.barcode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredData = this.data; // Reset to all vendors if search term is empty
    }
    this.currentPage = 1; // Reset to the first page when filtering
  }
  sortData() {
    if (this.selectedSortOption === 'name') {
      this.filteredData.sort((a: any, b: any) =>
        a?.user[0]?.fullName.localeCompare(b.user?.fullName)
    );
  } else if (this.selectedSortOption === 'date') {
      this.filteredData.sort(
        (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

    }
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
    return this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
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
