import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statscards',
  templateUrl: './statscards.component.html',
  styleUrls: ['./statscards.component.css']
})
export class StatscardsComponent {
constructor(private router: Router){}
gotoOrders(){
  this.router.navigate(['/business-admin/purchase-orders'])
}
}
