import { Component } from '@angular/core';

@Component({
  selector: 'app-vendor-view-open-disputes',
  templateUrl: './vendor-view-open-disputes.component.html',
  styleUrls: ['./vendor-view-open-disputes.component.css']
})
export class VendorViewOpenDisputesComponent {
  request = [
    {
      no: '001',
      itemname: 'Monitor',
      price: '272',
      priceperunit:'272',
      orderquantity: '1',
    },
    {
      no: '002',
      itemname: 'Mouse',
      price: '272',
      priceperunit:'272',
      orderquantity: '3',
    },
    {
      no: '003',
      itemname: 'Keyboard',
      price: '272',
      priceperunit:'272',
      orderquantity: '4',
    },
  ];
}
