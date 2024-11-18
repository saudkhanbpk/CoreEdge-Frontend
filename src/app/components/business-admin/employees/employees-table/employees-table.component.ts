import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmployesService } from 'src/app/services/employes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent {
  currentPage = 1;
  itemsPerPage = 10; 
  expandedIndex: number | null = null;
  data:any;
  constructor(
    private authService: AuthService,
    private employesService: EmployesService,
    private router: Router

  ){}
  ngOnInit(): void {
    const user = this.authService.getUserData();
    this.loadRoles(user.id);
  }

  loadRoles(userId: number) {
    this.employesService.findById(userId).subscribe((response: any) => {
      this.data = response; 
      // this.totalItems = response.length; 
    });
  }

  // data = [
  //   {
  //     name: 'Babar Azam',
  //     role:'Agent',
  //     email:'babar56@gmail.com',
  //     address:'watertown, MA ,USA',
  //     password:'bobby56'
  //   },
  //   {
  //     name: 'Virat Kohli',
  //     role:'Requester',
  //     email:'virat18@gmail.com',
  //     address:'watertown, MA ,USA',
  //     password:'virat18'
  //   },
  //   {
  //     name: 'Rohit Sharma',
  //     role:'Agent',
  //     email:'rohit32@gmail.com',
  //     address:'watertown, MA ,USA',
  //     password:'rohit32'
  //   },
  //   {
  //     name: 'Imran Khan',
  //     role:'Requester',
  //     email:'imrankhan804@gmail.com',
  //     address:'watertown, MA ,USA',
  //     password:'Imran804'
  //   },
  //   {
  //     name: 'Jimmy Anderson',
  //     role:'Agent',
  //     email:'jimmy91@gmail.com',
  //     address:'watertown, MA ,USA',
  //     password:'Jimmy91'
  //   },
  //   {
  //     name: 'Carlos Brathwate',
  //     role:'Requester',
  //     email:'carlos6666@gmail.com',
  //     address:'watertown, MA ,USA',
  //     password:'Carlos6666'
  //   },
  // ];

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

  employeeDelete(employee: any) {
    Swal.fire({
      icon: 'success',
      title: 'Employe Deleted',
      text: `The employe "${employee.name}" has been deleted successfully!`,
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employesService.delete(employee.id).subscribe((response: any) => {
          this.ngOnInit(); // Reload data after deletion
        });
      }
    });
  }

  employeeEdit(employee: any) {
    this.router.navigate(['/business-admin/employees/edit-employees'], { state: { employeeData: employee } });
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
