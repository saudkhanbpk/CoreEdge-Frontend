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
      email:'babar56@gmail.com',
      status:'Paid',
      amount:'3000'
    },
    {
      name: 'Virat Kohli',
      email:'virat18@gmail.com',
      status:'Dispute',
      amount:'2500'
    },
    {
      name: 'Rohit Sharma',
      email:'rohit32@gmail.com',
      status:'Pending',
      amount:'1800'
    },
    {
      name: 'Imran Khan',
      email:'imrankhan804@gmail.com',
      status:'Dispute',
      amount:'899'
    },
    {
      name: 'Jimmy Anderson',
      email:'jimmy91@gmail.com',
      status:'Paid',
      amount:'10000'
    },
    {
      name: 'Carlos Brathwate',
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
