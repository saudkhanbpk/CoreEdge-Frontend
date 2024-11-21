import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dialogRef: MatDialogRef<ProductDetailsComponent>
  ) {
    console.log("product details", this.data)
  }
  quantity: number = 1;  // Default to 1 if the user doesn't provide a quantity

  // The array that holds the added products
  addedProducts: any[] = [];

  // Add product and quantity to the addedProducts array
  addRequest(item: any, quantity: number): void {
    if (quantity <= 0) {
      Swal.fire('Error', 'Please select a valid quantity', 'error');
      return;
    }

    // Add product and quantity to array
    this.addedProducts.push({
      product: item,
      quantity: quantity
    });

    // Show SweetAlert2 modal
    Swal.fire({
      title: 'Product Added!',
      text: `${item.MaterialId} has been added to your request list with a quantity of ${quantity}.`,
      imageUrl: item.ImageLarge, // Assuming item.ImageLarge contains the image URL
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Product image',
      icon: 'success',
      confirmButtonText: 'OK'
    });

    let data = {
      product: this.addedProducts[0].product,
      quantity: this.addedProducts[0].quantity,

    }
    this.dialogRef.close(data);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
