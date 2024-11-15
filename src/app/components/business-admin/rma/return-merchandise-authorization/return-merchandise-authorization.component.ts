import { Component } from '@angular/core';

interface ProductDetail {
  itemname: string;
  price: number;
  quantityReturned: number;
  reason: string;
}

interface RMAOrder {
  rmaNo: string;
  employeename: string;
  employeeemail: string;
  productRequested: string;
  requesteddate: string;
  returndate: string;
  totalamount: number;
  vendor: string;
  returnstatus: string;
  productdetails: ProductDetail[];
  approvalStatus: boolean;
}
@Component({
  selector: 'app-return-merchandise-authorization',
  templateUrl: './return-merchandise-authorization.component.html',
  styleUrls: ['./return-merchandise-authorization.component.css']
})
export class ReturnMerchandiseAuthorizationComponent {
  rmaOrders: RMAOrder[] = [
    {
      rmaNo: 'RMA-001',
      employeename: 'John Doe',
      employeeemail: 'john.doe@example.com',
      productRequested: 'Dell Laptop',
      requesteddate: 'October 10th, 2024',
      returndate: 'October 12th, 2024',
      totalamount: 1500,
      vendor: 'Tech Supplies Inc.',
      returnstatus: 'Pending',
      productdetails: [
        { itemname: 'Laptop', price: 1500, quantityReturned: 1, reason: 'Defective screen' },
      ],
      approvalStatus: false,
    },
    {
      rmaNo: 'RMA-002',
      employeename: 'Jane Smith',
      employeeemail: 'jane.smith@example.com',
      productRequested: 'Wireless Mouse',
      requesteddate: 'October 8th, 2024',
      returndate: 'October 10th, 2024',
      totalamount: 30,
      vendor: 'Accessory Hub',
      returnstatus: 'Approved',
      productdetails: [
        { itemname: 'Mouse', price: 30, quantityReturned: 1, reason: 'Not working' },
      ],
      approvalStatus: true,
    }
  ];

  toggleApprovalStatus(order: RMAOrder) {
    order.approvalStatus = !order.approvalStatus;
    order.returnstatus = order.approvalStatus ? 'Approved' : 'Pending';
  }
}
