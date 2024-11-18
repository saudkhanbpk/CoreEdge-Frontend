import { Component } from '@angular/core';

@Component({
  selector: 'app-completed-requests',
  templateUrl: './completed-requests.component.html',
  styleUrls: ['./completed-requests.component.css']
})
export class CompletedRequestsComponent {
  currentPage = 1;
  itemsPerPage = 10; 
  data = [
    {
      no: '001',
      employeename: 'Saad Khan',
      employeeemail:'employeeemail@gmail.com',
      hardwarerequested:'Dell Monitor',
      description:'I just need it, my old monitor is broke.',
      status:'Completed'
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
