import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contracts-table',
  templateUrl: './contracts-table.component.html',
  styleUrls: ['./contracts-table.component.css']
})
export class ContractsTableComponent {
  currentPage = 1;
  itemsPerPage = 10; 
  readonly dialog = inject(MatDialog);

  
  data = [
    {
      no: '001',
      referenceno: '3445-32XHJ-232',
      contractname:'XYZ',
      owner:'John Doe',
      vendor:'Alexa Hailey',
      startdate:'October 3rd, 2024',
      enddate:'October 3rd, 2025',
      address:'Las Vegas',
      status : 'In Draft',
      description:'lorem ipsum dolor'
    },
    {
      no: '002',
      referenceno: '3445-32XHJ-232',
      contractname:'XYZ',
      owner:'John Doe',
      vendor:'Alexa Hailey',
      startdate:'October 3rd, 2024',
      enddate:'October 3rd, 2025',
      address:'Las Vegas',
      status : 'Approved',
      description:'lorem ipsum dolor'
    },
    {
      no: '003',
      referenceno: '3445-32XHJ-232',
      contractname:'XYZ',
      owner:'John Doe',
      vendor:'Alexa Hailey',
      startdate:'October 3rd, 2024',
      enddate:'October 3rd, 2025',
      address:'Las Vegas',
      status : 'Vendor Review',
      description:'lorem ipsum dolor'
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
