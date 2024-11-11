import { Component } from '@angular/core';

@Component({
  selector: 'app-approvals-details',
  templateUrl: './approvals-details.component.html',
  styleUrls: ['./approvals-details.component.css']
})
export class ApprovalsDetailsComponent {
  
  request = [
    {
      no: '001',
      materialid: '242-X34-3422',
      shortDescription:'Dell Monitor',
      quantity:5,
      price:'272',
    },
    {
      no: '002',
      materialid: '242-X34-3422',
      shortDescription:'Dell Monitor',
      quantity:8,
      price:'272',
    },
    {
      no: '003',
      materialid: '242-X34-3422',
      shortDescription:'Dell Monitor',
      quantity:3,
      price:'272',
    },
  ];
}
