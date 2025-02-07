import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewRmaComponent } from 'src/app/components/business-admin/rma/view-rma/view-rma.component';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.css']
})
export class OrderDetailsDialogComponent {
  constructor(private purchaseOrderService: PurchaseOrderService, private authService: AuthService, public dialogRef: MatDialogRef<ViewRmaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("data is : ", this, data);

  }

  // Function to handle "Resolved & Ship" button click
  // markAsResolved(): void {
  //   this.data.vendorStatus = 'Resolved';

  //   // Optional: Call an API or service to update the status
  //   console.log('Product marked as Resolved & Shipped:', this.data);

  //   // Close the dialog and return the updated data
  //   this.dialogRef.close(this.data);
  // }

  markAsResolved(newStatus: string) {
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
          this.data.vendorStatus = newStatus;
  
          console.log("data is : ", this.data);
          
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

    getShortNote(note: string): string {
      if (!note) return 'No reason provided';
      
      const words = note.trim().split(' '); // Split note into words
      return words.length > 3 
        ? `${words.slice(0, 3).join(' ')}...`  // Show first 3 words + "..."
        : note;  // If note has 3 or fewer words, show as is
    }
    

  request = [
    {
      no: "01",
      itemName: "Desktop Monitor",
      orderQty: 3,
      receivedQty: 2,
      broken: 0,
      wrongItem: 0,
    },
    {
      no: "02",
      itemName: "Logitech Keyboard",
      orderQty: 15,
      receivedQty: 12,
      broken: 4,
      wrongItem: 2,
    },
    {
      no: "03",
      itemName: "Logitech Keyboard",
      orderQty: 1,
      receivedQty: 1,
      broken: 0,
      wrongItem: 0,
    },
    {
      no: "04",
      itemName: "Logitech Keyboard",
      orderQty: 1,
      receivedQty: 1,
      broken: 0,
      wrongItem: 0,
    },
  ];
}
