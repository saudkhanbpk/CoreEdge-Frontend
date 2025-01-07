import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.css']
})
export class InvoiceTableComponent {
  currentPage = 1;
  itemsPerPage = 10; // Number of orders per page
  expandedIndex: number | null = null;
  constructor(){}
  ngOnInit(): void {
   console.log("this is data", this.data)
  }

  data = [
    {
      name: 'Babar Azam',
      invoiceno:'INV-3328432',
      purchaseorderno:'PuOr-342422',
      email:'babar56@gmail.com',
      status:'Paid',
      amount:'3000'
    },
    {
      name: 'Virat Kohli',
      invoiceno:'INV-3328432',
      purchaseorderno:'PuOr-342422',
      email:'virat18@gmail.com',
      status:'Dispute',
      amount:'2500'
    },
    {
      name: 'Rohit Sharma',
      invoiceno:'INV-3328432',
      purchaseorderno:'PuOr-342422',
      email:'rohit32@gmail.com',
      status:'Pending',
      amount:'1800'
    },
    {
      name: 'Imran Khan',
      invoiceno:'INV-3328432',
      purchaseorderno:'PuOr-342422',
      email:'imrankhan804@gmail.com',
      status:'Resolved',
      amount:'899'
    },
    {
      name: 'Jimmy Anderson',
      invoiceno:'INV-3328432',
      purchaseorderno:'PuOr-342422',
      email:'jimmy91@gmail.com',
      status:'Paid',
      amount:'10000'
    },
    {
      name: 'Carlos Brathwate',
      invoiceno:'INV-3328432',
      purchaseorderno:'PuOr-342422',
      email:'carlos6666@gmail.com',
      status:'Pending',
      amount:'9200'
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
}
