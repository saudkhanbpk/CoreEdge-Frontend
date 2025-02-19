import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

interface Order {
  purchaseorderno: string;
  employeename: string;
  employeeemail: string;
  hardwarerequested: string;
  requesteddate: string;
  receiveddate: string;
  totalamount: string;
  address: string;
  status: string;
  vendor: string;
  productdetails: any[]; // Update as per your actual structure
  discrepancies?: string[]; // For manual entry of discrepancies
}

@Component({
  selector: 'app-receiving-orders',
  templateUrl: './receiving-orders.component.html',
  styleUrls: ['./receiving-orders.component.css']
})
export class ReceivingOrdersComponent {
  loading:boolean = false
  allOrders: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  selectedOrder: any;
  purchaseOrderNo: any;
  discrepancies: string[] = [];
  filteredData:any=[]
  successfulItems: { itemname: string; quantityReceived: number }[] = [];
  status:any=[];
  selectedSortOption:any='';
  selectedstatus:any=[]

  constructor(private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      this.loading = true
      this.sharedService.getPurchaseOrders(user.id).subscribe(
        (orders: any[]) => {
          
          // const filteredOrders = orders.filter(
          //   (order) =>
          //     order.availableProducts &&
          //     order.availableProducts.length > 0 &&
          //     order.availableProducts[0]?.status === 'Approved'
          // );
          console.log("orders : ", orders);

          this.allOrders = orders;
          this.filteredData = this.allOrders
          if (this.filteredData) {
            this.loading = false
          }
          const seenNames = new Set();
          this.allOrders.forEach((element:any) => {
             if (!seenNames.has(element.status)) {
              seenNames.add(element.status);
              this.status.push(element.status);
              }
          });
          
        },
        (error) => {
          console.error('Error fetching vendor orders:', error);
        }
      );
    }
  }

  onInputChange(event: any) {
    const searchTerm = event.target.value; // Update the searchTerm variable
    if (searchTerm) {
      this.filteredData = this.allOrders.filter((item: any) =>
        item?.vendor[0].name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.barcode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredData = this.allOrders; // Reset to all vendors if search term is empty
    }
    this.currentPage = 1; // Reset to the first page when filtering
  }
  // loadOrders(): void {
  //   this.allOrders = this.orderService.orders;
  // }
  setOrder(order: any): void {
    this.sharedService.setSelectedOrder(order);
    this.router.navigate(['/business-admin/receiving/review-order']);
  }
  filteredbystatus() {
    if(this.selectedstatus == 'all'){
      this.filteredData = [...this.allOrders];
    }else{
      this.filteredData = this.selectedstatus
      ? this.allOrders.filter(
          (item:any) =>
            item.vendor[0]?.name == this.selectedstatus
        )
      : [...this.allOrders];
    }   
  }
  
  sortData() {
    if (this.selectedSortOption === 'name') {
      this.filteredData.sort((a:any, b:any) =>
        a?.vendor[0]?.name.localeCompare(b.vendor[0]?.name)
      );
    } else if (this.selectedSortOption === 'date') {
      this.filteredData.sort(
        (a:any, b:any) => new Date(a.startdate).getTime() - new Date(b.startdate).getTime()
      );

    }else if (this.selectedSortOption === 'amount') {
      this.filteredData.sort((a:any, b:any) =>
        a?.totalPrice.localeCompare(b.totalPrice)
      );
    }
  }

  get totalPages() {
    return Math.ceil(this.allOrders.length / this.itemsPerPage);
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
