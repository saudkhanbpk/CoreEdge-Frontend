import { Component, inject } from '@angular/core';
import { ViewApprovedHardwareRequestComponent } from '../view-approved-hardware-request/view-approved-hardware-request.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approved-hardware-request',
  templateUrl: './approved-hardware-request.component.html',
  styleUrls: ['./approved-hardware-request.component.css']
})
export class ApprovedHardwareRequestComponent {

  loading: boolean = false;
  isunavailable: boolean = false;
  currentPage = 1;
  itemsPerPage = 10;
  expandedIndex: number | null = null;
  status: any[] = []; // Declare status as a string array
  filteredData: any[] = [];
  selectedstatus: string = '';
  selectedSortOption='';
  data: any[] = [];
  readonly dialog = inject(MatDialog);

  constructor(private requestService: RequestService,
    private authService: AuthService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    const user = this.authService.getUserData();
    this.loading= true
    if (user) {
      // Subscribe to the data from SharedService
      this.sharedService.getData(user.id).subscribe(
        (items: any[]) => {
          const filteredItems = items.filter((item) => item.availableProducts && item.availableProducts.length > 0 && item.availableProducts[0]?.status == 'Approved');
          this.data = filteredItems;
          this.filteredData = [...this.data]; 
          if (this.filteredData) {
            this.loading=false
          }
         const seenNames = new Set<string>();
          this.data.forEach((item: any) => {
            item.availableProducts.forEach((product: any) => {
              if (!seenNames.has(product.status)) {
                seenNames.add(product.status);
                this.status.push(product.status);
              }
            });
          });
          console.log('Filtered Data:', this.data);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }
  }
  filterBystatus(): void {
    if (this.selectedstatus === 'all') {
      this.filteredData = [...this.data]; // Show all data
    } else if (this.selectedstatus) {
      this.filteredData = this.data.filter((item) =>
        item.availableProducts.some(
          (product: any) => product.status == this.selectedstatus
        )
      );
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
  // openDialog() {
  //   const dialogRef = this.dialog.open(ViewApprovedHardwareRequestComponent);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  openDialog(item: any) {
    console.log(item);

    const dialogRef = this.dialog.open(ViewApprovedHardwareRequestComponent, {
      data: item, // Pass the item to the dialog component
      width: 'auto', // Optional: Customize the dialog width
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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
      text: 'This action cannot be undone!',
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
              'The Hardware Request has been successfully deleted.',
              'success'
            );
          },
          error: (err: any) => {
            // Show error feedback
            Swal.fire(
              'Error!',
              'An error occurred while deleting the Hardware Request. Please try again.',
              'error'
            );
          }
        });
      }
    });
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
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
