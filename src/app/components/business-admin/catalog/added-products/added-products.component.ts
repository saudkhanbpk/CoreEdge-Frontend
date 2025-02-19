import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
import { AuthService } from 'src/app/services/auth.service';
import { EmployesService } from 'src/app/services/employes.service';
import { RequestService } from 'src/app/services/request.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-added-products',
  templateUrl: './added-products.component.html',
  styleUrls: ['./added-products.component.css']
})
export class AddedProductsComponent implements OnInit {
  loading = false;
  generatedRequest: any = null;
  employeeName: string = '';  
  employeeEmail: string = ''; 
  vendorName = 'TechVendor Inc.';
  vendorEmail = 'vendor@techvendor.com';
  description = '';
  optionsList: any = [];
  selectedOptions: any; 

  constructor(@Inject(MAT_DIALOG_DATA) public addedProducts: any[], private authService: AuthService, private employesService: EmployesService,
    private requestService: RequestService, private dialogref: MatDialogRef<AddedProductsComponent>, private sharedService: SharedService) {
    this.addedProducts = addedProducts || [];
  }

  ngOnInit(): void {
    const user = this.authService.getUserData();
    this.loadRoles(user.id);
  }

  loadRoles(userId: number): void {
    this.employesService.findById(userId).subscribe(
      (response: any) => {

        // Clear previous options
        this.optionsList = [];

        if (response.length > 0) {
          this.optionsList = response.map((role: any) => ({
            id: role.id,
            name: role.name,
          }));

          console.log("this.optionsList:", this.optionsList);

          const firstItem = response[0];
          this.employeeName = firstItem.employeeName || '';
          this.employeeEmail = firstItem.employeeEmail || '';
        } else {
          console.warn("Response array is empty. No roles found.");
        }
      },
      (error) => {
        console.error("Error loading roles:", error);
        this.optionsList = []; 
      }
    );
  }


  async submitRequest(): Promise<void> {
    try {
      this.loading = true; 
  
      const uniqueCode = `PurchaseRequest-${Date.now()}`;
  
      const orderData = {
        price:200,
        users: [this.authService.getUserData().id], 
        uniqueCode: uniqueCode,
        description: this.description,
        status: 'Pending',
        products: this.addedProducts,
        employees: [this.selectedOptions],
        statusUpdatedAt: new Date().toISOString(), 
      };
  
      // Send order data to the backend API for saving
      const response: any = await this.requestService.create(orderData).toPromise();
      console.log('Request successfully created on server: ', response);
  
      const barcodeData = JSON.stringify(orderData); 
      const barcodeCanvas = document.createElement('canvas');
      JsBarcode(barcodeCanvas, barcodeData, { format: 'CODE128' });
      const barcodeDataURL = barcodeCanvas.toDataURL('image/png');
  
      // Prepare the PDF document
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('Purchase Request', 10, 10);
      doc.setFontSize(12);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 20);
      doc.text(`Description: ${this.description}`, 10, 30);
  
      let y = 40;
      this.addedProducts.forEach((item, index) => {
        doc.text(`Product ${index + 1}`, 10, y);
        doc.text(`Short Description: ${item.product.shortDescription}`, 20, y + 10);
        doc.text(`Price: $${item.product.price}`, 20, y + 20);
        doc.text(`Material ID: ${item.product.materialId}`, 20, y + 30);
        doc.text(`Quantity: ${item.quantity}`, 20, y + 40);
        y += 50;
      });
  
      // Add barcode to the PDF
      doc.addImage(barcodeDataURL, 'PNG', 10, y, 80, 20);
      doc.save('./Purchase_Request.pdf'); // Download the PDF file
  
      // Update the UI to display the generated request
      this.generatedRequest = {
        ...orderData, // Include the entire order data
        barcode: barcodeDataURL,
      };
      console.log("this.authService.getUserData().id:", this.authService.getUserData());
      
      // this.sharedService.reloadData(this.authService.getUserData().id).subscribe((data: any) => {
      //   console.log("data is : ", data);  // Log the data
      // });
      this.dialogref.close(this.generatedRequest);
      console.log('Generated request:', this.generatedRequest);
    } catch (error) {
      console.error('Error submitting request:', error);
      // Optionally, display an error message to the user
    } finally {
      this.loading = false; // Hide loader
    }
  }
  
  // Method to save order data through API
  // saveOrder(orderData: any): void {
  //   this.http.post(this.apiUrl, orderData)
  //     .subscribe(
  //       (response) => {
  //         console.log('Order saved successfully:', response);
  //         // Optionally, handle any post-order save logic like approval flow
  //         this.sendForApproval(); // Send request for approval
  //       },
  //       (error) => {
  //         console.error('Error saving order:', error);
  //         // Handle error scenario (e.g., show an error message to the user)
  //       }
  //     );
  // }

  sendForApproval(): void {
    console.log('Purchase request sent for approval');
  }

  removeProduct(item: any): void {
    this.addedProducts = this.addedProducts.filter(product => product !== item);
  }
}
