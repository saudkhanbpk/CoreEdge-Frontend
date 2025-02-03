import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorReturnedOrdersRoutingModule } from './vendor-returned-orders-routing.module';
import { ReturnedOrderTableComponent } from './returned-order-table/returned-order-table.component';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';
import { MaterialModule } from 'src/app/material';


@NgModule({
  declarations: [
    ReturnedOrderTableComponent,
    OrderDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    VendorReturnedOrdersRoutingModule,
    MaterialModule
  ]
})
export class VendorReturnedOrdersModule { }
