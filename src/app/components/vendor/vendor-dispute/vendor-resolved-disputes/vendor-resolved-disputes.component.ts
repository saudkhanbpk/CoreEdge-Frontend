import { Component, inject } from '@angular/core';
import { VendorViewResolvedDisputesComponent } from '../vendor-view-resolved-disputes/vendor-view-resolved-disputes.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vendor-resolved-disputes',
  templateUrl: './vendor-resolved-disputes.component.html',
  styleUrls: ['./vendor-resolved-disputes.component.css']
})
export class VendorResolvedDisputesComponent {
 isunavailable: boolean = false;
  currentPage = 1;
  itemsPerPage = 10;
  expandedIndex: number | null = null;
  readonly dialog = inject(MatDialog);

  constructor() {}
  ngOnInit(): void {
    console.log('this is data', this.data);
  }

  data = [
    {
      no: '001',
      purchaseorderno: 'KDS-33-343',
      vendorname:'Saad Khan',
      vendoremail: 'vendoremail@gmail.com',
      totalitems: '5',
      totalamount: '3000',
      status: 'Onhold',
      date:'oct 20 , 2024'
    }
  ];

  openDialog() {
    const dialogRef = this.dialog.open(VendorViewResolvedDisputesComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
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
