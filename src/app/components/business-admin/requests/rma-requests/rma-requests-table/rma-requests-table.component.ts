import { Component, inject } from '@angular/core';
import { ViewRmaRequestComponent } from '../view-rma-request/view-rma-request.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';

@Component({
  selector: 'app-rma-requests-table',
  templateUrl: './rma-requests-table.component.html',
  styleUrls: ['./rma-requests-table.component.css']
})
export class RmaRequestsTableComponent {
  currentPage = 1;
  itemsPerPage = 10;
  expandedIndex: number | null = null;
  selectedSortOption = '';
  filteredData: any[] = []
  data: any = []
  // data:any;
  readonly dialog = inject(MatDialog);
  constructor(private purchaseOrderService: PurchaseOrderService, private authService: AuthService,) { }
  ngOnInit(): void {
    const user = this.authService.getUserData();
    this.fetchRMAOrders(user.id);
  }


  // fetchRMAOrders(userid: any): void {
  //   this.purchaseOrderService.getOrdersWithRMA(userid).subscribe({
  //     next: (orders) => {
  //       this.data = orders;
  //       this.filteredData = this.data

  //       console.log("RMA Orders:", this.data);
  //     },
  //     error: (error) => {
  //       console.error("Error fetching RMA orders:", error);
  //     }
  //   });
  // }
  fetchRMAOrders(userId: any): void {
    this.purchaseOrderService.getOrdersWithRMA(userId).subscribe({
      next: (orders) => {
        this.data = [...orders]; // Ensuring immutability
        this.filteredData = [...this.data]; // Creating a fresh reference
  
        console.log("RMA Orders:", this.data);
      },
      error: (error) => console.error("Error fetching RMA orders:", error),
    });
  }
  


  sortData() {
    if (this.selectedSortOption === 'name') {
      this.filteredData.sort((a, b) =>
        a.employeename.localeCompare(b.employeename)
      );
    } else if (this.selectedSortOption === 'date') {
      this.filteredData.sort(
        (a, b) => new Date(a.returndate).getTime() - new Date(b.returndate).getTime()
      );
    } else if (this.selectedSortOption === 'amount') {
      this.filteredData.sort(
        (a, b) => a.totalamount - b.totalamount
      );
    }
  }
  openDialog(item: any) {
    const dialogRef = this.dialog.open(ViewRmaRequestComponent, {
      data: item
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  get totalPages() {
    return Math.ceil(this.data?.length / this.itemsPerPage);
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
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
