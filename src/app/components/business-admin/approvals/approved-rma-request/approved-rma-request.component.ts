import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';
import { ViewApprovedRmaRequestComponent } from '../view-approved-rma-request/view-approved-rma-request.component';

@Component({
  selector: 'app-approved-rma-request',
  templateUrl: './approved-rma-request.component.html',
  styleUrls: ['./approved-rma-request.component.css']
})
export class ApprovedRmaRequestComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  private data: any[] = [];

  filteredData: any[] = []; 
  currentPage = 1;
  itemsPerPage = 5;
  selectedSortOption: 'name' | 'date' | 'amount' | '' = '';
  expandedIndex: number | null = null;

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserData();
    this.fetchApprovedRMAOrders(user.id);
  }

  private fetchApprovedRMAOrders(userId: any): void {
    this.purchaseOrderService.getOrdersWithRMA(userId, 'user').subscribe({
      next: (orders) => {
        this.data = orders.filter(
          (item: any) => item.rmaProducts[0]?.adminStatus === 'Approved'
        );
        this.applyFilters();
      },
      error: (error) => console.error('Error fetching RMA orders:', error),
    });
  }

  private applyFilters(): void {
    this.filteredData = [...this.data];
    this.sortData(); 
  }

  sortData(): void {
    switch (this.selectedSortOption) {
      case 'name':
        this.filteredData.sort((a, b) => a.employeename.localeCompare(b.employeename));
        break;
      case 'date':
        this.filteredData.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'amount':
        this.filteredData.sort((a, b) => a.totalamount - b.totalamount);
        break;
      default:
        break; 
    }
  }

  openDialog(item: any): void {
    const dialogRef = this.dialog.open(ViewApprovedRmaRequestComponent, { data: item });
    dialogRef.afterClosed().subscribe((result) => console.log(`Dialog result: ${result}`));
  }

  toggleDetails(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  get paginatedData(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  nextPage(): void {
    if (this.isNextPageAvailable()) this.currentPage++;
  }

  previousPage(): void {
    if (this.isPreviousPageAvailable()) this.currentPage--;
  }

  isNextPageAvailable(): boolean {
    return this.currentPage < this.totalPages;
  }

  isPreviousPageAvailable(): boolean {
    return this.currentPage > 1;
  }
}
