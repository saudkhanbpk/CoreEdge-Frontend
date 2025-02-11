import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewApprovedPurchaseRequestComponent } from '../view-approved-purchase-request/view-approved-purchase-request.component';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approved-purchase-request',
  templateUrl: './approved-purchase-request.component.html',
  styleUrls: ['./approved-purchase-request.component.css']
})
export class ApprovedPurchaseRequestComponent implements OnInit {
  loading: boolean = false
  currentPage = 1;
  itemsPerPage = 10;
  data: any[] = [];
  filteredData: any[] = []
  selectedEmployee: any = '';
  selectedSortOption = '';
  Employee: any = []
  readonly dialog = inject(MatDialog);
  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private sharedService: SharedService) {

  }

  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      this.loading = true
      this.sharedService.getData(user.id).subscribe(
        (items: any[]) => {
          const filteredItems = items.filter((item) => item.unavailableProducts && item.unavailableProducts.length > 0 && item.unavailableProducts[0]?.status == 'Approved');
          this.data = filteredItems;
          this.filteredData = this.data
          if (this.filteredData) {
            this.loading = false
          }
          // here check the employee lit before the same name are present
          const seenNames = new Set();
          this.Employee = this.data
            .map((i: any) => i.employees[0])
            .filter((employee: any) => {
              if (!seenNames.has(employee.name)) {
                seenNames.add(employee.name);
                return true;
              }
              return false;
            });
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }
  }

  filterByEmployeeNAme() {
    if (this.selectedEmployee == 'all') {
      this.filteredData = [...this.data];
    } else {
      this.filteredData = this.selectedEmployee
        ? this.data.filter(
          (item) =>
            item.employees[0]?.name == this.selectedEmployee
        )
        : [...this.data];
    }
  }

  sortData() {
    if (this.selectedSortOption === 'name') {
      this.filteredData.sort((a, b) =>
        a.employees[0]?.name.localeCompare(b.employees[0]?.name)
      );
    } else if (this.selectedSortOption === 'date') {
      this.filteredData.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
  }

  openDialog(item: any) {
    const dialogRef = this.dialog.open(ViewApprovedPurchaseRequestComponent, {
      data: item,
      width: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }


  get totalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  deleterequest(item: any) {
    // Show a confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the Purchase Order!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed to delete the item
        this.requestService.delete(item.id).subscribe({
          next: (res: any) => {
            // Show success feedback
            Swal.fire(
              'Deleted!',
              'The Purchase Request has been deleted successfully.',
              'success'
            );
          },
          error: (err: any) => {
            // Show error feedback
            Swal.fire(
              'Error!',
              'Unable to delete the Purchase Request. Please try again.',
              'error'
            );
          }
        });
      }
    });
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
