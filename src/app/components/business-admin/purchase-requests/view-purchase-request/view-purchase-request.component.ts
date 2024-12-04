import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-purchase-request',
  templateUrl: './view-purchase-request.component.html',
  styleUrls: ['./view-purchase-request.component.css']
})
export class ViewPurchaseRequestComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('Dialog data:', this.data); // Access the passed item here
  }
  isLoading: boolean = false; 
  isunavailable: boolean = false;
  vendors: any[] = [
    { id: 1, name: 'Vendor A' },
    { id: 2, name: 'Vendor B' },
    { id: 3, name: 'Vendor C' },
  ];
  request = [
    {
      no: '001',
      materialid: '242-X34-3422',
      price: '272',
      vendorname:'Jimmy Anderson',
      vendoremail: 'saadkhan922@company.com',
    },
    {
      no: '002',
      materialid: '242-X34-3422',
      price: '272',
      vendorname:'Jimmy Anderson',
      vendoremail: 'hamza002@company.com',
    },
    {
      no: '003',
      materialid: '242-X34-3422',
      price: '272',
      vendorname:'Jimmy Anderson',
      vendoremail: 'asadali3@company.com',
    },
  ];
  

}
