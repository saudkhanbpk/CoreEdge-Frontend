import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewPurchaseOrderComponent } from '../view-purchase-order/view-purchase-order.component';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-purchase-order-table',
  templateUrl: './purchase-order-table.component.html',
  styleUrls: ['./purchase-order-table.component.css']
})
export class PurchaseOrderTableComponent {
  currentPage = 1;
  itemsPerPage = 5;
  expandedIndex: number | null = null;
  readonly dialog = inject(MatDialog)
  constructor() { }
  ngOnInit(): void {
  

  }

  data = [
    {
      purchaseorderno: '2982-XJ82-92',
      employeename: 'Saad Khan',
      employeeemail:'employeeemail@gmail.com',
      hardwarerequested:'Dell Monitor',
      requesteddate :'October 3rd, 2024',
      receivedddate :'October 5th, 2024',
      totalamount :'3500',
      address:'Las Vegas',
      productdetails: [
        {
          name: 'Items Requested', items: [
            { itemname: 'Monitor', price: 5 },
            { itemname: 'Keyboard', price: 15 },
            { itemname: 'Mouse', price: 25 },
            { itemname: 'RAM', price: 35 },
          ]
        }
      ]
    },
  ];

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


  openDialog(){
    this.dialog.open(ViewPurchaseOrderComponent, {
      width:'60%'
    })
  }
}
