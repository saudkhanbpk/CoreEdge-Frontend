import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-added-products',
  templateUrl: './added-products.component.html',
  styleUrls: ['./added-products.component.css']
})
export class AddedProductsComponent {
  loading = false;
  generatedRequest: any = null; 
  employeeName = 'John Doe';
  employeeEmail= 'John@gmail.com'
  vendorName = 'TechVendor Inc.'; 
  vendorEmail = 'vendor@techvendor.com';
  description = '';
  constructor(@Inject(MAT_DIALOG_DATA) public addedProducts: any[]) {
    this.addedProducts =addedProducts || [];
  }

  optionsList: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4']; // Dropdown options

 
  async submitRequest() {
    this.loading = true;
    const uniqueCode = `PurchaseRequest-${Date.now()}`;

    // Prepare the PDF Document
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Purchase Request', 10, 10);
    doc.setFontSize(12);
    doc.text(`Employee: ${this.employeeName}`, 10, 20);
    doc.text(`Employee Email: ${this.employeeEmail}`, 10, 30);
        doc.text(`Vendor: ${this.vendorName}`, 10, 40);
    doc.text(`Vendor Email: ${this.vendorEmail}`, 10, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 60);
    doc.text(`Description: ${this.description}`, 10, 70);

    let y = 80;
    this.addedProducts.forEach((item, index) => {
      doc.text(`Product ${index + 1}`, 10, y);
      doc.text(`Short Description: ${item.product.ShortDescription}`, 20, y + 10);
      doc.text(`Price: $${item.product.CustomerPrice}`, 20, y + 20);
      doc.text(`Material ID: ${item.product.MaterialId}`, 20, y + 30);
      doc.text(`Quantity: ${item.quantity}`, 20, y + 40);
      y += 50;
    });

    // Generate and Add Barcode to PDF
    const barcodeCanvas = document.createElement('canvas');
    JsBarcode(barcodeCanvas, uniqueCode, { format: 'CODE128' });
    const barcodeDataURL = barcodeCanvas.toDataURL('image/png');
    doc.addImage(barcodeDataURL, 'PNG', 10, y, 80, 20);
    doc.save('Purchase_Request.pdf');
    
    this.loading = false; // Hide loader

    // Display the purchase order in UI
    this.generatedRequest = {
      employeeName: this.employeeName,
      employeeEmail: this.employeeEmail,
      vendorName: this.vendorName,
      vendorEmail: this.vendorEmail,
      date: new Date().toLocaleDateString(),
      barcode: barcodeDataURL,
      items: this.addedProducts,
      description:this.description
    };
    console.log("generated request" , this.generatedRequest)
    this.sendForApproval();
  }

sendForApproval() {
  console.log('Purchase request sent for approval');
}

removeProduct(item:any) {
  this.addedProducts = this.addedProducts.filter(product => product !== item);
}
}
