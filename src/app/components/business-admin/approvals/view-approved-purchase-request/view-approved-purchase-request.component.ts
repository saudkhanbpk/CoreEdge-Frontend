import { Component } from '@angular/core';

@Component({
  selector: 'app-view-approved-purchase-request',
  templateUrl: './view-approved-purchase-request.component.html',
  styleUrls: ['./view-approved-purchase-request.component.css']
})
export class ViewApprovedPurchaseRequestComponent {
  isLoading: boolean = false; 
  isunavailable: boolean = false;
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
