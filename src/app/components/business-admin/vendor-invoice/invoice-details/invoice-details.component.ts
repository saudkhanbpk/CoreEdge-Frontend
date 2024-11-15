import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent {
  isLoading: boolean = false; // State for spinner
  isPaid: boolean = false;    // State to check if paid
  showDisputeSection: boolean = false; // Flag to show/hide dispute section
  disputeSubmitted: boolean = false; // Flag to toggle button text
  data =[
    {
      name:'Jimmy Anderson',
      email:'Jimmyanderson@gmail.com',
      address:'Watertown, MA , USA',
      totalinvoiceamount:3300,
      requesteddate:'October 3rd, 2024',
      receiveddate:'October 5th, 2024',
      hardware:[
        {
          name:'monitor',
          quantity:5,
          price:200,
          totalprice:1000
        },
        {
          name:'keyboard',
          quantity:3,
          price:30,
          totalprice:90
        }
      ]
    }

  ]
  markAsPaid() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.isPaid = true;
    }, 2000); // Wait for 2 seconds to simulate the process
  }
  toggleDispute() {
    this.showDisputeSection = true; // Immediately show dispute section and change button text
  }
}
