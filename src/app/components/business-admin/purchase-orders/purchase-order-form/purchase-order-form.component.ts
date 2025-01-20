import { Component } from '@angular/core';
import { VendorsService } from 'src/app/services/vendors.service';

@Component({
  selector: 'app-purchase-order-form',
  templateUrl: './purchase-order-form.component.html',
  styleUrls: ['./purchase-order-form.component.css']
})
export class PurchaseOrderFormComponent {
  vendors: any[] = [];
  hardwareList = [{ name: '', quantity: 1 }];
   // Form model
   purchaseOrder = {
    vendor: '',
    vendorEmail: '',
    requestedDate: '',
    totalAmount: '',
    address: '',
    description: '',
    items: [{ itemName: '', quantity: 0, price: 0 }]
  }
  addHardware() {
    this.hardwareList.push({ name: '', quantity: 1 });
  }

  constructor(
    private vendorsService: VendorsService
  ) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  private loadVendors(): void {
    this.vendorsService.findAll().subscribe({
      next: (response) => (this.vendors = response),
      error: (err) => console.error('Error fetching vendors:', err)
    });
  }
  onVendorChange(event: any): void {
    const vendorId = event.target.value
    const selectedVendor = this.vendors.find((vendor) => vendor.id == vendorId) || null;
    this.purchaseOrder.vendorEmail = selectedVendor?.email || '';
  }

  removeHardware() {
    if (this.hardwareList.length > 1) {
      this.hardwareList.pop();
    }
  }
    // Submit form
    submitForm() {
      console.log('Purchase Order Data:', this.purchaseOrder);
    }
}
