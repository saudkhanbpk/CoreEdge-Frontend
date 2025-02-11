import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { ClearOrderPoppComponent } from '../clear-order-popp/clear-order-popp.component';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.css']
})
export class ReviewOrderComponent {
  readonly dialog = inject(MatDialog)
  selectedOrder: any;
  isEditing: boolean = false;
  loading: boolean = true
  remainingProducts: any[] = []; // To store remaining products
  rmaproducts: any[] = []; // To store updated products
  tableData = [
    { name: 'Desktop Monitor', orderQuantity: 1, receivedQuantity: 1, brokenQuantity: 0, wrongItemQuantity: 0, checked: false },
    // Add more rows as needed
  ];
  allChecked = false; // Tracks the "Select All" checkbox state
  isAnyCheckboxChecked = false; // Tracks if any checkbox is selected

  constructor(private sharedService: SharedService, private router: Router , private   purchaseOrderService :PurchaseOrderService){ }

  ngOnInit(): void {
    this.loading = true
    this.selectedOrder = this.sharedService.getSelectedOrder();
    if (this.selectedOrder) {
      this.loading = false
    }
    if (!this.selectedOrder) {
      this.router.navigate(['/business-admin/receiving']);
    }
  }


  // Triggered when any individual checkbox is toggled
  onCheckboxChange() {
    this.isAnyCheckboxChecked = this.tableData.some(item => item.checked);
    this.allChecked = this.tableData.every(item => item.checked);
  }

  // Toggles all checkboxes when the "Select All" checkbox is toggled
  toggleAllCheckboxes(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.tableData.forEach(item => (item.checked = isChecked));
    this.isAnyCheckboxChecked = isChecked;
  }
  currentEditingItem: any = null; // To track the currently editing item

  toggleEdit(item: any, index: number) {
    if (this.currentEditingItem === item) {
      this.currentEditingItem = null;
      this.isEditing = false;
    } else {
      this.currentEditingItem = item;
      this.isEditing = true;

      if (!this.selectedOrder || !this.selectedOrder.products) {
        this.selectedOrder = { products: [] };
      }

      const product = this.selectedOrder.products[index];

      if (product) {
        product.receivedQuantity = item.receivedQuantity || 0;
        product.brokenQuantity = item.brokenQuantity || 0;
        product.wrongItemQuantity = item.wrongItemQuantity || 0;
        product.note = item.note;
      } else {
        this.selectedOrder.products[index] = {
          receivedQuantity: item.receivedQuantity,
          brokenQuantity: item.brokenQuantity,
          wrongItemQuantity: item.wrongItemQuantity,
          note: item.note,
        };
      }
    }

    console.log("Currently editing item:", this.currentEditingItem);
    console.log("Updated selectedOrder:", this.selectedOrder);
  }

  updateReport() {
    // Ensure necessary arrays exist
    this.selectedOrder.rmaproducts = this.selectedOrder.rmaproducts || [];
    this.selectedOrder.clearedproducts = this.selectedOrder.clearedproducts || [];

    // Store the full original product list if it hasn't been stored before
    if (!this.selectedOrder.allProducts) {
      this.selectedOrder.allProducts = [...this.selectedOrder.products]; // Store full products
    }

    const updatedProduct = {
      ...this.currentEditingItem,
      adminStatus: this.currentEditingItem.adminStatus || "Pending",
      vendorStatus: this.currentEditingItem.vendorStatus || "Pending",
    };

    console.log("Updated Product:", updatedProduct);

    // Find the index of the *exact* product in the original products array using deep comparison
    const originalProductIndex = this.selectedOrder.products.findIndex((product: any) => {
      return JSON.stringify(product) === JSON.stringify(this.currentEditingItem); // Deep comparison
    });

    if (originalProductIndex !== -1) {
      // Add updated product to rmaProducts
      this.selectedOrder.rmaproducts.push(updatedProduct);

      // Remove the product from the original products array *directly* using splice
      this.selectedOrder.products.splice(originalProductIndex, 1);

    } else {
      // Check if the product exists in cleared products
      const clearedProductIndex = this.selectedOrder.clearedproducts.findIndex((product: any) => {
        return JSON.stringify(product) === JSON.stringify(this.currentEditingItem);
      });

      if (clearedProductIndex !== -1) {
        this.selectedOrder.rmaproducts.push(updatedProduct);
        this.selectedOrder.clearedproducts.splice(clearedProductIndex, 1);
      } else {
        console.log("Product not found in original or cleared products.");
      }
    }

    // **Update cleared products**
    this.selectedOrder.clearedproducts = this.selectedOrder.allProducts.filter((product: any) => {
      return !this.selectedOrder.rmaproducts.some((rmaProduct: any) => JSON.stringify(rmaProduct) === JSON.stringify(product));
    });

    // Ensure cleared products have default status
    this.selectedOrder.clearedproducts.forEach((product: any) => {
      product.adminStatus = product.adminStatus || "Pending";
      product.vendorStatus = product.vendorStatus || "Pending";
    });

    this.isEditing = false;

    console.log("All Products:", this.selectedOrder.allProducts);
    console.log("RMA Products:", this.selectedOrder.rmaproducts);
    console.log("Original Products:", this.selectedOrder.products);
    console.log("Cleared Products:", this.selectedOrder.clearedproducts);
  }


  sendToRMA() {
    console.log('Before Sending to RMA:', this.selectedOrder);

    // Assign products to cleared products
    this.selectedOrder.products = [...this.selectedOrder.allProducts];

    // Remove `allProducts` as it's no longer needed
    delete this.selectedOrder.allProducts;

    // Prepare data for API
    const updateData = {
      products: this.selectedOrder.products,
      rmaProducts: this.selectedOrder.rmaproducts,
      clearedProducts: this.selectedOrder.clearedproducts,
      barcode: this.selectedOrder.barcode,
      totalPrice: this.selectedOrder.totalPrice,
      vendorStatus: this.selectedOrder.vendorStatus,
      adminStatus: this.selectedOrder.adminStatus,
      status: this.selectedOrder.status,
      description: this.selectedOrder.description,
    };
    if(this.selectedOrder.rmaProducts.length > 0){
      updateData.adminStatus = 'In RMA'
    }

    // Call API
    this.purchaseOrderService.updatePurchaseOrder(this.selectedOrder.id, updateData).subscribe(
      (response) => {
        console.log('Purchase Order Updated Successfully:', response);
        this.router.navigate(['/business-admin/receiving'])
      },
      (error) => {
        console.error('Error updating purchase order:', error);
      }
    );

    console.log('After Sending to RMA:', this.selectedOrder);
  }



  openDialog(item: any) {
    this.dialog.open(ClearOrderPoppComponent, {
      data: item,
      width: 'auto'
    })
  }
}

