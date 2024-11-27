// import { Component, Inject, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import * as JsBarcode from 'jsbarcode';
// import jsPDF from 'jspdf';
// import { AuthService } from 'src/app/services/auth.service';
// import { EmployesService } from 'src/app/services/employes.service';

// @Component({
//   selector: 'app-added-products',
//   templateUrl: './added-products.component.html',
//   styleUrls: ['./added-products.component.css']
// })
// export class AddedProductsComponent implements OnInit {
//   loading = false;
//   generatedRequest: any = null; 
//   employeeName = 'John Doe';
//   employeeEmail= 'John@gmail.com'
//   vendorName = 'TechVendor Inc.'; 
//   vendorEmail = 'vendor@techvendor.com';
//   description = '';
//   optionsList: string[] = [];

//   constructor(@Inject(MAT_DIALOG_DATA) public addedProducts: any[], private authService: AuthService,private employesService: EmployesService,) {
//     this.addedProducts =addedProducts || [];
//   }

//   ngOnInit(): void {
//     const user = this.authService.getUserData();
//     this.loadRoles(user.id);
//   }

//   loadRoles(userId: number) {
//     this.employesService.findById(userId).subscribe((response: any) => {
//       console.log(response);

//       // Clear previous options (if needed)
//       this.optionsList = [];

//       // Iterate over response and push each item name into optionsList
//       response.forEach((item: any) => {
//         console.log(item.name);
//         this.optionsList.push(item.name);  // Push to optionsList
//       });
//     });
//   }


//   // ['Option 1', 'Option 2', 'Option 3', 'Option 4']; // Dropdown options


//   async submitRequest() {
//     this.loading = true;
//     const uniqueCode = `PurchaseRequest-${Date.now()}`;

//     // Prepare the PDF Document
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text('Purchase Request', 10, 10);
//     doc.setFontSize(12);
//     doc.text(`Employee: ${this.employeeName}`, 10, 20);
//     doc.text(`Employee Email: ${this.employeeEmail}`, 10, 30);
//         doc.text(`Vendor: ${this.vendorName}`, 10, 40);
//     doc.text(`Vendor Email: ${this.vendorEmail}`, 10, 50);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 60);
//     doc.text(`Description: ${this.description}`, 10, 70);

//     let y = 80;
//     this.addedProducts.forEach((item, index) => {
//       doc.text(`Product ${index + 1}`, 10, y);
//       doc.text(`Short Description: ${item.product.ShortDescription}`, 20, y + 10);
//       doc.text(`Price: $${item.product.CustomerPrice}`, 20, y + 20);
//       doc.text(`Material ID: ${item.product.MaterialId}`, 20, y + 30);
//       doc.text(`Quantity: ${item.quantity}`, 20, y + 40);
//       y += 50;
//     });

//     // Generate and Add Barcode to PDF
//     const barcodeCanvas = document.createElement('canvas');
//     JsBarcode(barcodeCanvas, uniqueCode, { format: 'CODE128' });
//     const barcodeDataURL = barcodeCanvas.toDataURL('image/png');
//     doc.addImage(barcodeDataURL, 'PNG', 10, y, 80, 20);
//     doc.save('Purchase_Request.pdf');

//     this.loading = false; // Hide loader

//     // Display the purchase order in UI
//     this.generatedRequest = {
//       employeeName: this.employeeName,
//       employeeEmail: this.employeeEmail,
//       vendorName: this.vendorName,
//       vendorEmail: this.vendorEmail,
//       date: new Date().toLocaleDateString(),
//       barcode: barcodeDataURL,
//       items: this.addedProducts,
//       description:this.description
//     };
//     console.log("generated request" , this.generatedRequest)
//     this.sendForApproval();
//   }

// sendForApproval() {
//   console.log('Purchase request sent for approval');
// }

// removeProduct(item:any) {
//   this.addedProducts = this.addedProducts.filter(product => product !== item);
// }
// }



import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
import { AuthService } from 'src/app/services/auth.service';
import { EmployesService } from 'src/app/services/employes.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-added-products',
  templateUrl: './added-products.component.html',
  styleUrls: ['./added-products.component.css']
})
export class AddedProductsComponent implements OnInit {
  loading = false;
  generatedRequest: any = null;
  employeeName: string = '';  // Empty initially, will be set dynamically
  employeeEmail: string = ''; // Empty initially, will be set dynamically
  vendorName = 'TechVendor Inc.';
  vendorEmail = 'vendor@techvendor.com';
  description = '';
  optionsList: any = []; // Dynamically populated options
  selectedOptions: any; // To store selected options

  constructor(@Inject(MAT_DIALOG_DATA) public addedProducts: any[], private authService: AuthService, private employesService: EmployesService,
    private requestService: RequestService) {
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
          // Assuming each item in the array contains `id` and `name` for roles
          this.optionsList = response.map((role: any) => ({
            id: role.id,
            name: role.name,
          }));

          console.log("this.optionsList:", this.optionsList);

          // Assuming the first object in the array contains employee data
          const firstItem = response[0];
          this.employeeName = firstItem.employeeName || '';
          this.employeeEmail = firstItem.employeeEmail || '';
        } else {
          console.warn("Response array is empty. No roles found.");
        }
      },
      (error) => {
        console.error("Error loading roles:", error);
        this.optionsList = []; // Ensure optionsList is cleared in case of error
      }
    );
  }



  // async submitRequest(): Promise<void> {
  //   this.loading = true;
  //   const uniqueCode = `PurchaseRequest-${Date.now()}`;

  //   // Prepare the PDF Document
  //   const doc = new jsPDF();
  //   doc.setFontSize(16);
  //   doc.text('Purchase Request', 10, 10);
  //   doc.setFontSize(12);
  //   doc.text(`Employee: ${this.employeeName}`, 10, 20);
  //   doc.text(`Employee Email: ${this.employeeEmail}`, 10, 30);
  //   doc.text(`Vendor: ${this.vendorName}`, 10, 40);
  //   doc.text(`Vendor Email: ${this.vendorEmail}`, 10, 50);
  //   doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 60);
  //   doc.text(`Description: ${this.description}`, 10, 70);

  //   let y = 80;
  //   this.addedProducts.forEach((item, index) => {
  //     doc.text(`Product ${index + 1}`, 10, y);
  //     doc.text(`Short Description: ${item.product.shortDescription}`, 20, y + 10);
  //     doc.text(`Price: $${item.product.price}`, 20, y + 20);
  //     doc.text(`Material ID: ${item.product.materialId}`, 20, y + 30);
  //     doc.text(`Quantity: ${item.quantity}`, 20, y + 40);
  //     y += 50;
  //   });

  //   // Generate and Add Barcode to PDF
  //   const barcodeCanvas = document.createElement('canvas');
  //   JsBarcode(barcodeCanvas, uniqueCode, { format: 'CODE128' });
  //   const barcodeDataURL = barcodeCanvas.toDataURL('image/png');
  //   doc.addImage(barcodeDataURL, 'PNG', 10, y, 80, 20);
  //   doc.save('Purchase_Request.pdf');

  //   this.loading = false; // Hide loader

  //   // Display the purchase order in UI
  //   this.generatedRequest = {
  //     employeeName: this.employeeName,
  //     employeeEmail: this.employeeEmail,
  //     vendorName: this.vendorName,
  //     vendorEmail: this.vendorEmail,
  //     date: new Date().toLocaleDateString(),
  //     barcode: barcodeDataURL,
  //     items: this.addedProducts,
  //     description: this.description,
  //     selectedOptions: this.selectedOptions
  //   };
  //   console.log("generated request", this.generatedRequest);
  //   this.sendForApproval();
  // }


  // async submitRequest(): Promise<void> {
  //   this.loading = true; // Show loader
  //   const uniqueCode = `PurchaseRequest-${Date.now()}`;

  //   // Prepare the PDF Document
  //   const doc = new jsPDF();
  //   doc.setFontSize(16);
  //   doc.text('Purchase Request', 10, 10);
  //   doc.setFontSize(12);
  //   doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 20);
  //   doc.text(`Description: ${this.description}`, 10, 30);

  //   let y = 40;
  //   this.addedProducts.forEach((item, index) => {
  //     doc.text(`Product ${index + 1}`, 10, y);
  //     doc.text(`Short Description: ${item.product.shortDescription}`, 20, y + 10);
  //     doc.text(`Price: $${item.product.price}`, 20, y + 20);
  //     doc.text(`Material ID: ${item.product.materialId}`, 20, y + 30);
  //     doc.text(`Quantity: ${item.quantity}`, 20, y + 40);
  //     y += 50;
  //   });

  //   // Generate and Add Barcode to PDF
  //   const barcodeCanvas = document.createElement('canvas');
  //   JsBarcode(barcodeCanvas, uniqueCode, { format: 'CODE128' });
  //   const barcodeDataURL = barcodeCanvas.toDataURL('image/png');
  //   doc.addImage(barcodeDataURL, 'PNG', 10, y, 80, 20);
  //   doc.save('Purchase_Request.pdf');

  //   this.loading = false; // Hide loader

  //   // Display the purchase order in UI
  //   this.generatedRequest = {
  //     date: new Date().toLocaleDateString(),
  //     barcode: barcodeDataURL,
  //     items: this.addedProducts,
  //     description: this.description,
  //     employe:this.selectedOptions
  //   };
  //   console.log("Generated request:", this.generatedRequest);

  //   this.sendForApproval(); // Send request for approval
  // }


  async submitRequest(): Promise<void> {
    this.loading = true; // Show loader

    const uniqueCode = `PurchaseRequest-${Date.now()}`;
    console.log("ihtizaz : ", this.addedProducts);
    ;
    // Prepare the order data
    const orderData = {
      users: this.authService.getUserData().id,
      uniqueCode: uniqueCode,
      description: this.description,
      status: 'PENDING',
      products: this.addedProducts,
      employees: this.selectedOptions,
      statusUpdatedAt: new Date().toLocaleDateString(),
    };
    this.requestService.create(orderData).subscribe((res: any) => {
      console.log('res: ', res);

    })
    return
    // Encode order data into a string and generate barcode
    const barcodeData = JSON.stringify(orderData); // JSON string of the order
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
    doc.save('Purchase_Request.pdf');

    this.loading = false; // Hide loader

    // Display the purchase order data in the UI
    this.generatedRequest = {
      ...orderData,  // Include the entire order data
      barcode: barcodeDataURL,
    };
    console.log("Generated request:", this.generatedRequest);

    // Send order data to the backend API for saving
    // this.saveOrder(orderData);
    console.log("ihtizaz order : ", orderData);

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
