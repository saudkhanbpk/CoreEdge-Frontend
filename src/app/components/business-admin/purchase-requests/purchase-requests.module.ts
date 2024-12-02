import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRequestsRoutingModule } from './purchase-requests-routing.module';
import { PurchaseRequestTableComponent } from './purchase-request-table/purchase-request-table.component';
import { PurchaseRequestFormComponent } from './purchase-request-form/purchase-request-form.component';
import { MaterialModule } from 'src/app/material';
import { FormsModule } from '@angular/forms';
import { ViewPurchaseRequestComponent } from './view-purchase-request/view-purchase-request.component';


@NgModule({
  declarations: [
    PurchaseRequestTableComponent,
    PurchaseRequestFormComponent,
    ViewPurchaseRequestComponent
  ],
  imports: [
    CommonModule,
    PurchaseRequestsRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class PurchaseRequestsModule { }
