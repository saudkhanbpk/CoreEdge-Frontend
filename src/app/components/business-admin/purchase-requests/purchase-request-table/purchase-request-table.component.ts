import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase-request-table',
  templateUrl: './purchase-request-table.component.html',
  styleUrls: ['./purchase-request-table.component.css']
})
export class PurchaseRequestTableComponent {
  currentPage = 1;
  itemsPerPage = 10; 
  data = [
    {
      no: '001',
      employeename: 'Saad Khan',
      employeeemail:'employeeemail@gmail.com',
      hardwarerequested:'Dell Monitor',
      date:'October 3rd, 2024',
      address:'Las Vegas',
    },
  ];
 
 
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
