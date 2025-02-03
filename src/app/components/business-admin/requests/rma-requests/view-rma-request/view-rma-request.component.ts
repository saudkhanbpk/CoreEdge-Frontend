import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-rma-request',
  templateUrl: './view-rma-request.component.html',
  styleUrls: ['./view-rma-request.component.css']
})
export class ViewRmaRequestComponent {
  rmaOrders: any[] = [];
   userId: any;
 
   isLoading: boolean = false;
   isunavailable: boolean = false;
   constructor(private purchaseOrderService: PurchaseOrderService, private authService: AuthService, public dialogRef: MatDialogRef<ViewRmaRequestComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any) {
 
   }
 
   ngOnInit(): void {
 
   }
   updateStatus(newStatus: string) {
    Swal.fire({
      title: `Are you sure you want to mark this as ${newStatus}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, mark as ${newStatus}`
    }).then((result) => {
      if (result.isConfirmed) {
        if (Array.isArray(this.data.rmaProducts)) {
          this.data.rmaProducts.forEach((product: any) => {
            product.adminStatus = newStatus;
          });
        } else {
          this.data.rmaProducts = [];
        }
  
        this.data.status = newStatus;
  
        this.purchaseOrderService.updatePurchaseOrder(this.data.id, this.data).subscribe(
          (response) => {
            Swal.fire("Updated!", `Status has been changed to ${newStatus}.`, "success");
            console.log("Purchase Order Updated Successfully:", response);
            this.dialogRef.close(newStatus);
          },
          (error) => {
            Swal.fire("Error!", "Something went wrong while updating the status.", "error");
            console.error("Error updating purchase order:", error);
          }
        );
      }
    });
  }
  
  
  
 
   closeDialog() {
     this.dialogRef.close();
   }
 }