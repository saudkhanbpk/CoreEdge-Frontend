import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-rma',
  templateUrl: './view-rma.component.html',
  styleUrls: ['./view-rma.component.css']
})
export class ViewRmaComponent {
  rmaOrders: any[] = [];
  userId: any;

  isLoading: boolean = false;
  isunavailable: boolean = false;
  constructor(private purchaseOrderService: PurchaseOrderService, private authService: AuthService, public dialogRef: MatDialogRef<ViewRmaComponent>,
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
        // Update status in data
        this.data.status = newStatus;

        // Call API to update status
        this.purchaseOrderService.updatePurchaseOrder(this.data.id, this.data).subscribe(
          (response) => {
            Swal.fire("Updated!", `Status has been changed to ${newStatus}.`, "success");
            console.log("Purchase Order Updated Successfully:", response);
            this.dialogRef.close(newStatus); // Close dialog and return status
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
