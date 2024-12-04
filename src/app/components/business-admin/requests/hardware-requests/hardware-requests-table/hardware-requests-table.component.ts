import { Component, inject } from '@angular/core';
import { ViewHardwareRequestComponent } from '../view-hardware-request/view-hardware-request.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-hardware-requests-table',
  templateUrl: './hardware-requests-table.component.html',
  styleUrls: ['./hardware-requests-table.component.css']
})
export class HardwareRequestsTableComponent {

  isLoading: boolean[] = [];
  isunavailable: boolean = false;
  currentPage = 1;
  itemsPerPage = 10;
  expandedIndex: number | null = null;
  readonly dialog = inject(MatDialog);

  data: any; // Initialize as an empty array to prevent `undefined` issues

  constructor(
    private requestService: RequestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      this.requestService.findByUserId(user.id).subscribe(
        (items) => {
          this.data = items.orders;
        },
        (error) => {
          console.error('Error fetching data:', error);
          // this.data = []; // Ensure `data` is always defined
        }
      );
    }
  }

 
  // data = [
  //   {
  //     no: '001',
  //     employeename: 'Saad Khan',
  //     employeeemail: 'employeeemail@gmail.com',
  //     hardwarerequested: 'Dell Monitor',
  //     description: 'I just need it, my old monitor is broke.',
  //     status: 'Onhold',
  //     date:'oct 20 , 2024'
  //   },
  //   {
  //     no: '002',
  //     employeename: 'Ihtizaz Ahmad',
  //     employeeemail: 'employeeemail@gmail.com',
  //     hardwarerequested: 'Dell Monitor',
  //     description: 'I just need it, my old monitor is broke.',
  //     status: 'Ready',
  //     date:'oct 20 , 2024'

  //   },
  // ];
  openDialog(item: any) {
    console.log('Opening dialog with item:', item);
    const dialogRef = this.dialog.open(ViewHardwareRequestComponent, {
      data: item, // Pass the item to the dialog component
      width: '500px', // Optional: Customize the dialog width
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  get totalPages() {
    return Math.ceil((this.data?.length || 0) / this.itemsPerPage); // Handle cases where `data` might still be empty or undefined
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.data?.slice(startIndex, startIndex + this.itemsPerPage) || []; // Add a fallback to handle `undefined`
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
