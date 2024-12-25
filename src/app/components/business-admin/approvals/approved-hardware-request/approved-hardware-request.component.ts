import { Component, inject } from '@angular/core';
import { ViewApprovedHardwareRequestComponent } from '../view-approved-hardware-request/view-approved-hardware-request.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-approved-hardware-request',
  templateUrl: './approved-hardware-request.component.html',
  styleUrls: ['./approved-hardware-request.component.css']
})
export class ApprovedHardwareRequestComponent {

  isLoading: boolean[] = [];
  isunavailable: boolean = false;
  currentPage = 1;
  itemsPerPage = 10;
  data: any[] = [];
  expandedIndex: number | null = null;
  readonly dialog = inject(MatDialog);

  constructor( private requestService: RequestService,
      private authService: AuthService,
          private sharedService: SharedService) {}
  // ngOnInit(): void {
  //   const user = this.authService.getUserData();
  //   if (user) {
  //     this.requestService.findByUserId(user.id).subscribe(
  //       (items) => {
  //         this.data = items;
  //       },
  //       (error) => {
  //         console.error('Error fetching data:', error);
  //         // this.data = []; // Ensure `data` is always defined
  //       }
  //     );
  //   }
  // }

  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      // Subscribe to the data from SharedService
      this.sharedService.getData(user.id).subscribe(
        (items: any[]) => {
          const filteredItems = items.filter((item) => item.availableProducts && item.availableProducts.length > 0 && item.availableProducts[0]?.status == 'Approved');
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
  //     status: 'Approved',
  //     date:'oct 20 , 2024'
  //   },
  //   {
  //     no: '002',
  //     employeename: 'Ihtizaz Ahmad',
  //     employeeemail: 'employeeemail@gmail.com',
  //     hardwarerequested: 'Dell Monitor',
  //     description: 'I just need it, my old monitor is broke.',
  //     status: 'Approved',
  //     date:'oct 20 , 2024'

  //   },
  // ];
  // openDialog() {
  //   const dialogRef = this.dialog.open(ViewApprovedHardwareRequestComponent);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
  
   openDialog(item:any) {
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
    this.requestService.delete(item.id).subscribe((res:any)=> {
    }) 
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
