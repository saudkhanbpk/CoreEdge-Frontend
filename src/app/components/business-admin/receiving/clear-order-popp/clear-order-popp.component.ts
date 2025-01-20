import { Component } from '@angular/core';

@Component({
  selector: 'app-clear-order-popp',
  templateUrl: './clear-order-popp.component.html',
  styleUrls: ['./clear-order-popp.component.css']
})
export class ClearOrderPoppComponent {
 
  request = [
    {
      no: '001',
      materialid: 'Dell Monitor',
      price: '272',
      orderedqty:'6',
      receievedqty: '3',
    },
    {
      no: '002',
      materialid: 'HP Keyboard',
      price: '272',
      orderedqty:'6',
      receievedqty: '5',
    },
    {
      no: '003',
      materialid: 'IBM LCD',
      price: '272',
      orderedqty:'6',
      receievedqty: '4',
    },
  ];
  

}
