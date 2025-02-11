import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';

@Component({
  selector: 'app-clear-order-popp',
  templateUrl: './clear-order-popp.component.html',
  styleUrls: ['./clear-order-popp.component.css']
})
export class ClearOrderPoppComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialogRef: MatDialogRef<ClearOrderPoppComponent>, private purchaseOrderService: PurchaseOrderService) {
    console.log(this.data)
  }

  clearOrder() {
    this.data.adminStatus = 'Cleared';
    this.data.clearedProducts = this.data.products


    // Call API
    this.purchaseOrderService.updatePurchaseOrder(this.data.id, this.data).subscribe(
      (response) => {
        console.log('Purchase Order Updated Successfully:', response);
        this.dialogRef.close();

        this.router.navigate(['/business-admin/receiving']);
      },
      (error) => {
        console.error('Error updating purchase order:', error);
      }
    );
  }



}
