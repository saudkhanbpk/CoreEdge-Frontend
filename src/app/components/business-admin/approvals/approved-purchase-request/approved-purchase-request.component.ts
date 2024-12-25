import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewPurchaseRequestComponent } from '../../purchase-requests/view-purchase-request/view-purchase-request.component';
import { ViewApprovedPurchaseRequestComponent } from '../view-approved-purchase-request/view-approved-purchase-request.component';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-approved-purchase-request',
  templateUrl: './approved-purchase-request.component.html',
  styleUrls: ['./approved-purchase-request.component.css']
})
export class ApprovedPurchaseRequestComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 10; 
  data: any[] = [];
  readonly dialog = inject(MatDialog);
  constructor(
        private requestService: RequestService,
        private authService: AuthService,
        private sharedService: SharedService){

  }

  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      this.sharedService.getData(user.id).subscribe(
        (items: any[]) => {
          const filteredItems = items.filter((item) => item.unavailableProducts && item.unavailableProducts.length > 0 && item.unavailableProducts[0]?.status == 'Approved');
          this.data = filteredItems;
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
  //     employeeemail:'employeeemail@gmail.com',
  //     hardwarerequested:'Dell Monitor',
  //     date:'October 3rd, 2024',
  //     address:'Las Vegas',
  //     status : 'Approved',
  //     description:'lorem ipsum dolor'
  //   },
  //   {
  //     no: '002',
  //     employeename: 'Khan',
  //     employeeemail:'employeeemail@gmail.com',
  //     hardwarerequested:'Dell Monitor',
  //     date:'October 3rd, 2024',
  //     address:'Las Vegas',
  //     status : 'Approved',
  //     description:'lorem ipsum dolor'
  //   },
  //   {
  //     no: '003',
  //     employeename: 'Khan',
  //     employeeemail:'employeeemail@gmail.com',
  //     hardwarerequested:'Dell Monitor',
  //     date:'October 3rd, 2024',
  //     address:'Las Vegas',
  //     status : 'Approved',
  //     description:'lorem ipsum dolor'
  //   },
  // ];


  
     openDialog(item:any) {        
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

  // openDialog() {
  //   const dialogRef = this.dialog.open(ViewApprovedPurchaseRequestComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
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
