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

  searchOrder(): void {
    if (this.purchaseOrderNo) {
      this.selectedOrder = this.orderService.getOrderByPurchaseOrderNo(this.purchaseOrderNo);
      if (!this.selectedOrder) {
        Swal.fire('Order Not Found', 'No order found with this Purchase Order Number.', 'error');
      }
    }
  }

  checkBarcode(item: any): void {
    item.barcodeMismatch = !this.isValidBarcode(item.barcode);
  }

  isValidBarcode(barcode: string): boolean {
    return true; 
  }

  addDiscrepancy(itemname: string, message: string): void {
    const discrepancyMessage = `${itemname}: ${message}`;
    if (!this.discrepancies.includes(discrepancyMessage)) {
      this.discrepancies.push(discrepancyMessage);
    }
  }

  sendBackToVendor(): void {
    if (this.discrepancies.length > 0) {
      console.log('Sending items back to vendor:', this.discrepancies);
      Swal.fire('Items Sent', 'The discrepancies have been sent back to the vendor.', 'success');
      this.discrepancies = []; 
    } else {
      Swal.fire('No Discrepancies', 'There are no discrepancies to send back.', 'info');
    }
  }
  confirmSendBackToVendor(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to send the discrepancies back to the vendor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, send it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sendBackToVendor(); 
      }
    });
  }
  
  submitReport(): void {
    if (this.selectedOrder) {
      this.orderService.saveDiscrepancies(this.selectedOrder, this.discrepancies);
      const reports = this.orderService.generateReports(this.selectedOrder);
      console.log('Submitting report for order:', this.selectedOrder.purchaseorderno);
      console.log('Successful Items:', reports.successfulItems);
      console.log('Discrepancies:', reports.discrepancies);
      Swal.fire('Report Submitted', 'Your report has been submitted successfully.', 'success');
      this.successfulItems = [];
      this.discrepancies = [];
    } else {
      Swal.fire('No Order Selected', 'Please select an order before submitting the report.', 'warning');
    }
  }
}
