import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewPurchaseRequestComponent } from '../view-purchase-request/view-purchase-request.component';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-purchase-request-table',
  templateUrl: './purchase-request-table.component.html',
  styleUrls: ['./purchase-request-table.component.css']
})
export class PurchaseRequestTableComponent {
  currentPage = 1;
  itemsPerPage = 10; 
  data: any[] = [];
  filteredData: any[] = [];
  Employee:any[] =[];
  selectedEmployee='';
  selectedSortOption='';
  readonly dialog = inject(MatDialog);
  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      this.sharedService.getData(user.id).subscribe(
        (items: any[]) => {
          const filteredItems = items.filter((item) => item.unavailableProducts && item.unavailableProducts.length > 0);
          this.data = filteredItems;
          this.filteredData = this.data
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
    if(this.selectedEmployee == 'all'){
      this.filteredData = [...this.data];
    }else{
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

  onInputChange(event: any) {
    const searchTerm = event.target.value; // Update the searchTerm variable
    if (searchTerm) {
      this.filteredData = this.data.filter((item: any) =>
        item.employees[0].name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.employees[0].email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredData = this.data; // Reset to all vendors if search term is empty
    }
    this.currentPage = 1; // Reset to the first page when filtering
  }
  // data = [
  //   {
  //     no: '001',
  //     employeename: 'Saad Khan',
  //     employeeemail:'employeeemail@gmail.com',
  //     hardwarerequested:'Dell Monitor',
  //     date:'October 3rd, 2024',
  //     address:'Las Vegas',
  //     status : 'Pending',
  //     description:'lorem ipsum dolor'
  //   },
  //   {
  //     no: '002',
  //     employeename: 'Khan',
  //     employeeemail:'employeeemail@gmail.com',
  //     hardwarerequested:'Dell Monitor',
  //     date:'October 3rd, 2024',
  //     address:'Las Vegas',
  //     status : 'Rejected',
  //     description:'lorem ipsum dolor'
  //   },
  //   {
  //     no: '003',
  //     employeename: 'Khan',
  //     employeeemail:'employeeemail@gmail.com',
  //     hardwarerequested:'Dell Monitor',
  //     date:'October 3rd, 2024',
  //     address:'Las Vegas',
  //     status : 'Pending',
  //     description:'lorem ipsum dolor'
  //   },
  // ];
 
 
  get totalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }
  
  deleterequest(item: any) {
    // Show a confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
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
            Swal.fire(
              'Deleted!',
              'Your item has been deleted.',
              'success'
            );
          },
          error: (err: any) => {
            Swal.fire(
              'Error!',
              'Something went wrong. Please try again.',
              'error'
            );
          }
        });
      }
    });
  }

  openDialog(item: any): void {  
    const dialogRef = this.dialog.open(ViewPurchaseRequestComponent, {
      data: item, 
      width: 'auto',
    });
      dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
      this.ngOnInit()
      }
      console.log(`Dialog closed with result: ${result}`);
    });
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
