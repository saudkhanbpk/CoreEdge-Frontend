import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent {
  invoiceNumber: string = '';
  vendorContact: string = '';
  vendorTIN: string = '';
  purchaseOrderNo: string = '';
  discounts: number = 0;
  taxes: number = 0;
  shippingCharges: number = 0;
  otherCharges: number = 0;
  user: any;
  data: any;
  selectedOrder: any;
  _invoiceDate: Date = new Date(); 
  _dueDate: Date = new Date(); 


  constructor(private authService: AuthService, private purchaseOrderService: PurchaseOrderService,private invoiceService: InvoiceService, private router: Router) {
    this.user = this.authService.getUserData();
    this.fetchVendorinvoice();
  }

  private fetchVendorinvoice(): void {
    this.purchaseOrderService.findVendorOrders().subscribe({
      next: (orders) => {
        this.data = orders;
      },
      error: (err) => {
        console.error('Error fetching vendor orders:', err);
      }
    });
  }

  logSelectedOrder() {
    console.log('Selected Order Object:', this.selectedOrder);
}

  // Getter for invoiceDate, formatted as a string
  get invoiceDate(): string {
    return this._invoiceDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  }
  get dueDate(): string {
    return this._dueDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  }

  // Setter to convert the string input back to a Date object
  set invoiceDate(value: string) {
    this._invoiceDate = new Date(value);
    this._dueDate = new Date(value); 
  }
  set dueDate(value: string) {
    this._dueDate = new Date(value); 
  }

  get totalAmountDue() {
    const totalPrice = parseFloat(this.selectedOrder?.totalPrice) || 0; 
    return totalPrice + this.taxes + this.shippingCharges + this.otherCharges - this.discounts;
}
  updateSubtotal(item: any) {
    item.subtotal = item.quantity * item.unitPrice;
  }
  createInvoice(): void {
    const invoiceData = {
      invoiceDate: this.invoiceDate,
      dueDate: this.dueDate,
      vendor: this.selectedOrder.vendor[0].id, 
      user: this.selectedOrder.users[0].id,  
      vendorContact: this.vendorContact,
      vendorTIN: this.vendorTIN,
      purchaseOrderNo: this.selectedOrder.id, 
      products: this.selectedOrder.products,
      discounts: this.discounts,
      totalPrice: this.totalAmountDue, 
      taxes: this.taxes,
      purchaseOrder: this.selectedOrder.id,
      shippingCharges: this.shippingCharges,
      otherCharges: this.otherCharges,
    };

    this.invoiceService.createInvoice(invoiceData).subscribe(
      (response) => {
        this.router.navigate(['/vendor/vendor-catalog']);
        // console.log('Invoice Created Successfully:', response);
      },
      (error) => {
        console.error('Error creating invoice:', error);
      }
    );
  }
}

