import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseOrdersRoutingModule } from './purchase-orders-routing.module';
import { PurchaseOrderTableComponent } from './purchase-order-table/purchase-order-table.component';
import { PurchaseOrderFormComponent } from './purchase-order-form/purchase-order-form.component';
import { MaterialModule } from 'src/app/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewPurchaseOrderComponent } from './view-purchase-order/view-purchase-order.component';


@NgModule({
  declarations: [
    PurchaseOrderTableComponent,
    PurchaseOrderFormComponent,
    ViewPurchaseOrderComponent
  ],
  imports: [
    CommonModule,
    PurchaseOrdersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PurchaseOrdersModule { }
