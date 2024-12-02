import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory-product-details',
  templateUrl: './inventory-product-details.component.html',
  styleUrls: ['./inventory-product-details.component.css']
})
export class InventoryProductDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    console.log("product details", this.data)
  }


  
}
