import { Component } from '@angular/core';

@Component({
  selector: 'app-vendor-response',
  templateUrl: './vendor-response.component.html',
  styleUrls: ['./vendor-response.component.css']
})
export class VendorResponseComponent {
 
  vendorresponse = [
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
