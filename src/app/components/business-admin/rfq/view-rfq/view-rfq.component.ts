import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateRequisitionComponent } from '../create-requisition/create-requisition.component';
import { VendorResponseComponent } from '../vendor-response/vendor-response.component';
import { OrderDetailsOfVendorComponent } from '../order-details-of-vendor/order-details-of-vendor.component';

@Component({
  selector: 'app-view-rfq',
  templateUrl: './view-rfq.component.html',
  styleUrls: ['./view-rfq.component.css']
})
export class ViewRfqComponent {
  constructor(public dialog: MatDialog) {}

  openRequisition() {
    const dialogRef = this.dialog.open(CreateRequisitionComponent, {
      width: '400px' // Set the desired width
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
    openVendorResponse() {
      const dialogRef = this.dialog.open(VendorResponseComponent,{
        maxWidth:'1200px',
        width:'100%'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    openOrderDetails() {
      const dialogRef = this.dialog.open(OrderDetailsOfVendorComponent,{
        maxWidth:'1200px',
        width:'100%'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

  purchasedItems = [
    {
      vendorname: 'Alex Hailey',
      itemsavailable: 1,
      responsedate: '23th Oct 2024',
      quotedamount: 3150,
      approvedamount: 3200,
      status: 'Accepted'
    },
    {
      vendorname: 'Mitchell Starc',
      itemsavailable: 1,
      responsedate: '23th Oct 2024',
      quotedamount: 3150,
      approvedamount: 3200,
      status: 'Rejected'
    },
    {
      vendorname: 'Alex Hailey',
      itemsavailable: 1,
      responsedate: '23th Oct 2024',
      quotedamount: 3150,
      approvedamount: 3200,
      status: 'Accepted'
    },
    {
      vendorname: 'Mitchell Starc',
      itemsavailable: 1,
      responsedate: '23th Oct 2024',
      quotedamount: 3150,
      approvedamount: 3200,
      status: 'Rejected'
    },
    {
      vendorname: 'Alex Hailey',
      itemsavailable: 1,
      responsedate: '23th Oct 2024',
      quotedamount: 3150,
      approvedamount: 3200,
      status: 'Accepted'
    },
    {
      vendorname: 'Mitchell Starc',
      itemsavailable: 1,
      responsedate: '23th Oct 2024',
      quotedamount: 3150,
      approvedamount: 3200,
      status: 'Rejected'
    },
  ]

}
