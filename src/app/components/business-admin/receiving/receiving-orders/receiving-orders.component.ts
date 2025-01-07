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
  allOrders: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  selectedOrder: any;
  purchaseOrderNo: any;
  discrepancies: string[] = [];
  successfulItems: { itemname: string; quantityReceived: number }[] = [];

  constructor(private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
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
          console.log('Filtered Orders:', this.allOrders);
        },
        (error) => {
          console.error('Error fetching vendor orders:', error);
        }
      );
    }
  }


  // loadOrders(): void {
  //   this.allOrders = this.orderService.orders;
  // }
  setOrder(order: any): void {
    this.sharedService.setSelectedOrder(order);
    this.router.navigate(['/business-admin/receiving/review-order']);
  }
  


  get totalPages() {
    return Math.ceil(this.allOrders.length / this.itemsPerPage);
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.allOrders.slice(startIndex, startIndex + this.itemsPerPage);
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
