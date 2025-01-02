import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewItemsComponent } from '../add-new-items/add-new-items.component';

@Component({
  selector: 'app-order-details-of-vendor',
  templateUrl: './order-details-of-vendor.component.html',
  styleUrls: ['./order-details-of-vendor.component.css']
})
export class OrderDetailsOfVendorComponent {
   constructor(public dialog: MatDialog) {}
  
    addnewitem() {
      const dialogRef = this.dialog.open(AddNewItemsComponent, {
        width: '400px' // Set the desired width
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  orderdetails = [
    {
      no: '001',
      itemname:'Desktop Monitor',
      orderqty:'3',
      availableqty:'3',
      askedprice:'350',
      quotedprice:'340'
    },
    {
      no: '002',
      itemname:'Desktop Monitor',
      orderqty:'3',
      availableqty:'3',
      askedprice:'350',
      quotedprice:'340'
    },
    {
      no: '003',
      itemname:'Desktop Monitor',
      orderqty:'3',
      availableqty:'3',
      askedprice:'350',
      quotedprice:'340'
    },
  ];
}
