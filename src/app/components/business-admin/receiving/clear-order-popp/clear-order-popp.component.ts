import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-clear-order-popp',
  templateUrl: './clear-order-popp.component.html',
  styleUrls: ['./clear-order-popp.component.css']
})
export class ClearOrderPoppComponent {
 constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ClearOrderPoppComponent>) {
  console.log(this.data)
  }
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
