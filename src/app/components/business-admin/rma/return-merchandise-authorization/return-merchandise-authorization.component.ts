import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewRmaComponent } from '../view-rma/view-rma.component';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';

@Component({
  selector: 'app-return-merchandise-authorization',
  templateUrl: './return-merchandise-authorization.component.html',
  styleUrls: ['./return-merchandise-authorization.component.css']
})
export class ReturnMerchandiseAuthorizationComponent {
  filteredData:any =[]
  status:any =[];
  selectedSortOption:any=[]
  rmaOrders: any[] = [];
  userId :any;
  data :any;
   constructor(private purchaseOrderService: PurchaseOrderService,private authService: AuthService,) {}
  
    ngOnInit(): void {
      const user = this.authService.getUserData();
      // this.loadRoles(user.id);
      this.fetchRMAOrders(user.id);
    }
  
    // fetchRMAOrders(userid:any): void {
    //   this.purchaseOrderService.getOrdersWithRMA(userid).subscribe({
    //     next: (orders) => {
    //       this.data = orders;
    //       this.filteredData = this.data;
    //         const seenNames = new Set();
    //         this.filteredData.forEach((element:any) => {
    //            if (!seenNames.has(element.status)) {
    //             seenNames.add(element.status);
    //             this.status.push(element.status);
    //             }
    //         });
    //       console.log("RMA Orders:", this.data);
    //     },
    //     error: (error) => {
    //       console.error("Error fetching RMA orders:", error);
    //     }
    //   });
    // }
    fetchRMAOrders(userId: any): void {
      this.purchaseOrderService.getOrdersWithRMA(userId).subscribe({
        next: (orders) => {
          if (!this.data) { // Fetch data only if not already set
            this.data = [...orders];
            this.filteredData = [...this.data];
    
            // Extract unique statuses using Set
            this.status = [...new Set(this.filteredData.map((order: any) => order.status))];
    
            console.log("RMA Orders:", this.data);
          }
        },
        error: (error) => console.error("Error fetching RMA orders:", error),
      });
    }
    
  currentPage = 1;
  itemsPerPage = 10;
  expandedIndex: number | null = null;
  selectedstatus:any=''
  readonly dialog = inject(MatDialog);


  filteredbystatus() {
    if(this.selectedstatus == 'all'){
      this.filteredData = [...this.data];
    }else{
      this.filteredData = this.selectedstatus
      ? this.data.filter(
          (item:any) =>
            item.status == this.selectedstatus
        )
      : [...this.data];
    }   
  }
  
  sortData() {
    if (this.selectedSortOption === 'name') {
      this.filteredData.sort((a:any, b:any) =>
        a?.employeename.localeCompare(b.employeename)
      );
    } else if (this.selectedSortOption === 'date') {
      this.filteredData.sort(
        (a:any, b:any) => new Date(a.startdate).getTime() - new Date(b.startdate).getTime()
      );

    }else if (this.selectedSortOption === 'amount') {
      this.filteredData.sort((a:any, b:any) =>
        a?.totalamount.localeCompare(b.totalamount)
      );
    }
  }


  onInputChange(event: any) {
    
    const searchTerm = event.target.value;
    if (searchTerm) {
      this.filteredData = this.data.filter((item: any) =>
        item?.employeename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.employeeemail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.venderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.rmano.toLowerCase().includes(searchTerm.toLowerCase()) 
        
      );
    } else {
      this.filteredData = this.data; 
    }
    this.currentPage = 1; 
  }

  openDialog(item:any) {
    console.log("item : ",item);
    
    const dialogRef = this.dialog.open(ViewRmaComponent,{
      data:item
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  get totalPages() {
    return Math.ceil(this.filteredData?.length / this.itemsPerPage);
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

