import { Component, inject } from '@angular/core';
import { ViewHardwareRequestComponent } from '../view-hardware-request/view-hardware-request.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { SharedService } from 'src/app/services/shared.service';

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
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      this.sharedService.getData(user.id).subscribe(
        (items: any[]) => {
          const filteredItems = items.filter((item) => item.availableProducts && item.availableProducts.length > 0);
          this.data = filteredItems;
          console.log('Filtered Data:', this.data);
        },
        (error) => {
          console.error('Error fetching data:', error);
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
    const dialogRef = this.dialog.open(ViewHardwareRequestComponent, {
      data: item, 
      width: 'auto', 
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.ngOnInit()
        }
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
