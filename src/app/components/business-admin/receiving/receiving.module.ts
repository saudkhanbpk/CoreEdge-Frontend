import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceivingRoutingModule } from './receiving-routing.module';
import { ReceivingOrdersComponent } from './receiving-orders/receiving-orders.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material';
import { ReviewOrderComponent } from './review-order/review-order.component';
import { ClearOrderPoppComponent } from './clear-order-popp/clear-order-popp.component';


@NgModule({
  declarations: [
    ReceivingOrdersComponent,
    ReviewOrderComponent,
    ClearOrderPoppComponent,
  ],
  imports: [
    CommonModule,
    ReceivingRoutingModule,
    FormsModule,
    MaterialModule,
  ]
})
export class ReceivingModule { }
