import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.css']
})
export class ReviewOrderComponent implements OnInit {
  selectedOrder: any;

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.selectedOrder = this.sharedService.getSelectedOrder();
    console.log('Selected Order:', this.selectedOrder);
    if (!this.selectedOrder) {
      console.error('No order found. Redirecting back to the orders page.');
      this.router.navigate(['/business-admin/receiving']);
    }
  }
  
}

