import { Component } from '@angular/core';

@Component({
  selector: 'app-view-open-disputes',
  templateUrl: './view-open-disputes.component.html',
  styleUrls: ['./view-open-disputes.component.css']
})
export class ViewOpenDisputesComponent {
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
