import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-rma-request',
  templateUrl: './view-rma-request.component.html',
  styleUrls: ['./view-rma-request.component.css']
})
export class ViewRmaRequestComponent {
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