import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
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
  status:string;
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
  allOrders: Order[] = [];
  currentPage = 1;
  itemsPerPage = 10;  
  selectedOrder: any  ; 
  purchaseOrderNo: any  ; 
  discrepancies: string[] = []; 
  successfulItems: { itemname: string; quantityReceived: number }[] = []; 

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders(); 
  }

  loadOrders(): void {
    this.allOrders = this.orderService.orders;
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
