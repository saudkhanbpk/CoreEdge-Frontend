import { Component, inject } from '@angular/core';
import { VendorViewPurchaseOrderComponent } from '../vendor-view-purchase-order/vendor-view-purchase-order.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vendor-purchase-order-table',
  templateUrl: './vendor-purchase-order-table.component.html',
  styleUrls: ['./vendor-purchase-order-table.component.css']
})
export class VendorPurchaseOrderTableComponent {
  currentPage = 1;
  itemsPerPage = 10;
  expandedIndex: number | null = null;
  readonly dialog = inject(MatDialog)
  constructor() { }
  ngOnInit(): void {
  

  }

  data = [
    {
      purchaseorderno: '2982-XJ82-92',
      businessname: 'Saad Khan',
      businessemail:'businessemail@gmail.com',
      hardwarerequested:'Dell Monitor',
      requesteddate :'October 3rd, 2024',
      receivedddate :'October 5th, 2024',
      totalamount :'3500',
      address:'Las Vegas',
      status:'Ordered',
      checked:false,
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
    {
      purchaseorderno: '2982-XJ82-92',
      businessname: 'Ihtizaz Ahmad',
      businessemail:'businessemail@gmail.com',
      hardwarerequested:'Dell Monitor',
      requesteddate :'October 3rd, 2024',
      receivedddate :'October 5th, 2024',
      totalamount :'3500',
      address:'Las Vegas',
      status:'Pending',
      checked:false,
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
    {
      purchaseorderno: '2982-XJ82-92',
      businessname: 'Aamir Shehzad',
      businessemail:'businessemail@gmail.com',
      hardwarerequested:'Dell Monitor',
      requesteddate :'October 3rd, 2024',
      receivedddate :'October 5th, 2024',
      totalamount :'3500',
      address:'Las Vegas',
      status:'Rejected',
      checked:false,
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
  toggleAllCheckboxes(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.paginatedData.forEach(item => {
      item.checked = isChecked;
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


  openDialog(){
    this.dialog.open(VendorViewPurchaseOrderComponent, {
      width:'60%'
    })
  }
}
