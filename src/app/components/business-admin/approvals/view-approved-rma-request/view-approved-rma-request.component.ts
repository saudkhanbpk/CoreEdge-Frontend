import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseOrderService } from 'src/app/services/purchase-order.service';
import { ViewRmaComponent } from '../../rma/view-rma/view-rma.component';

@Component({
  selector: 'app-view-approved-rma-request',
  templateUrl: './view-approved-rma-request.component.html',
  styleUrls: ['./view-approved-rma-request.component.css']
})
export class ViewApprovedRmaRequestComponent {
   constructor(private purchaseOrderService: PurchaseOrderService, private authService: AuthService, public dialogRef: MatDialogRef<ViewRmaComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
  console.log(data);
  
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
