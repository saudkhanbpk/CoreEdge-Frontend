import { Component } from '@angular/core';

@Component({
  selector: 'app-view-approved-rma-request',
  templateUrl: './view-approved-rma-request.component.html',
  styleUrls: ['./view-approved-rma-request.component.css']
})
export class ViewApprovedRmaRequestComponent {
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
