import { Component } from '@angular/core';

@Component({
  selector: 'app-view-rfq',
  templateUrl: './view-rfq.component.html',
  styleUrls: ['./view-rfq.component.css']
})
export class ViewRfqComponent {


  purchasedItems = [
    {
      vendorname: 'Alex Hailey',
      itemsavailable: 1,
      responsedate: '23th Oct 2024',
      quotedamount: 3150,
      approvedamount: 3200,
      status: 'Accepted'
    },
    {
      vendorname: 'Mitchell Starc',
      itemsavailable: 1,
      responsedate: '23th Oct 2024',
      quotedamount: 3150,
      approvedamount: 3200,
      status: 'Rejected'
    },
    {
      vendorname: 'Alex Hailey',
      itemsavailable: 1,
      responsedate: '23th Oct 2024',
      quotedamount: 3150,
      approvedamount: 3200,
      status: 'Accepted'
    },
    {
      vendorname: 'Mitchell Starc',
      itemsavailable: 1,
      responsedate: '23th Oct 2024',
      quotedamount: 3150,
      approvedamount: 3200,
      status: 'Rejected'
    },
    {
      vendorname: 'Alex Hailey',
      itemsavailable: 1,
      responsedate: '23th Oct 2024',
      quotedamount: 3150,
      approvedamount: 3200,
      status: 'Accepted'
    },
    {
      vendorname: 'Mitchell Starc',
      itemsavailable: 1,
      responsedate: '23th Oct 2024',
      quotedamount: 3150,
      approvedamount: 3200,
      status: 'Rejected'
    },
  ]

}
