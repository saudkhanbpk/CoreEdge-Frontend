import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.css']
})
export class RolesTableComponent {
  currentPage = 1;
  itemsPerPage = 10; 
  expandedIndex: number | null = null;
  constructor(private rolesService :RolesService, private authService : AuthService){}
  ngOnInit(): void {
   console.log("this is data", this.data)
   const user= this.authService.getUserData()
   this.rolesService.findAll(user.id).subscribe((item:any)=> {
    console.log("item : ",item)
   })
   console.log("user : ", user)
  }

  data = [
    {
      name: 'Requester',
      status:'Active',
    },
    {
      name: 'Agent',
      status:'Inactive',
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
