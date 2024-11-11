import { Component } from '@angular/core';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent {
  currentPage = 1;
  itemsPerPage = 10; 
  expandedIndex: number | null = null;
  constructor(){}
  ngOnInit(): void {
   console.log("this is data", this.data)
  }

  data = [
    {
      name: 'Babar Azam',
      role:'Agent',
      email:'babar56@gmail.com',
      address:'watertown, MA ,USA',
      password:'bobby56'
    },
    {
      name: 'Virat Kohli',
      role:'Requester',
      email:'virat18@gmail.com',
      address:'watertown, MA ,USA',
      password:'virat18'
    },
    {
      name: 'Rohit Sharma',
      role:'Agent',
      email:'rohit32@gmail.com',
      address:'watertown, MA ,USA',
      password:'rohit32'
    },
    {
      name: 'Imran Khan',
      role:'Requester',
      email:'imrankhan804@gmail.com',
      address:'watertown, MA ,USA',
      password:'Imran804'
    },
    {
      name: 'Jimmy Anderson',
      role:'Agent',
      email:'jimmy91@gmail.com',
      address:'watertown, MA ,USA',
      password:'Jimmy91'
    },
    {
      name: 'Carlos Brathwate',
      role:'Requester',
      email:'carlos6666@gmail.com',
      address:'watertown, MA ,USA',
      password:'Carlos6666'
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
