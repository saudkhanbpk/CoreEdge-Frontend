import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewPurchaseRequestComponent } from '../view-purchase-request/view-purchase-request.component';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';


@Component({
  selector: 'app-purchase-request-table',
  templateUrl: './purchase-request-table.component.html',
  styleUrls: ['./purchase-request-table.component.css']
})
export class PurchaseRequestTableComponent {
  currentPage = 1;
  itemsPerPage = 10; 
  data: any[] = [];
  readonly dialog = inject(MatDialog);
  constructor(
    private requestService: RequestService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      this.requestService.findByUserId(user.id).subscribe(
        (items) => {
          this.data = items.purchaseOrders;
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
    return this.data.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  openDialog(item:any) {
    console.log(item);
    
    const dialogRef = this.dialog.open(ViewPurchaseRequestComponent, {
      data: item, // Pass the item to the dialog component
      width: '500px', // Optional: Customize the dialog width
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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
