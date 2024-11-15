import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceivingRoutingModule } from './receiving-routing.module';
import { ReceivingOrdersComponent } from './receiving-orders/receiving-orders.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material';


@NgModule({
  declarations: [
    ReceivingOrdersComponent
  ],
  imports: [
    CommonModule,
    ReceivingRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class ReceivingModule { }
