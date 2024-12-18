import { Component } from '@angular/core';

@Component({
  selector: 'app-view-resolved-disputes',
  templateUrl: './view-resolved-disputes.component.html',
  styleUrls: ['./view-resolved-disputes.component.css']
})
export class ViewResolvedDisputesComponent {
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
