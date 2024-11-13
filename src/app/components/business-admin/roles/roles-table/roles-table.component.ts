import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RolesService } from 'src/app/services/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.css'],
})
export class RolesTableComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 10;
  expandedIndex: number | null = null;
  data: any[] = []; 
  totalItems: number = 0; 
  constructor(
    private rolesService: RolesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserData();
    this.loadRoles(user.id);
  }

  loadRoles(userId: number) {
    this.rolesService.findAll(userId).subscribe((response: any) => {
      this.data = response; 
      this.totalItems = response.length; 
    });
  }

  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.data.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.reloadRoles();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.reloadRoles();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.reloadRoles();
    }
  }

  isNextPageAvailable() {
    return this.currentPage < this.totalPages;
  }

  roleEdit(role: any) {
    console.log('Role data:', role);
    this.router.navigate(['/business-admin/roles/edit-roles'], { state: { roleData: role } });
  }
  

  roleDelete(item: any) {
    Swal.fire({
      icon: 'success',
      title: 'Role Added',
      text: `The role "${item.name}" has been added successfully!`,
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolesService.delete(item.id).subscribe((response: any) => {
          this.ngOnInit();
        });
      }
    });
  }

  isPreviousPageAvailable() {
    return this.currentPage > 1;
  }

  reloadRoles() {
    const user = this.authService.getUserData();
    this.loadRoles(user.id);
  }
}
