import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RfqRoutingModule } from './rfq-routing.module';
import { RfqMainComponent } from './rfq-main/rfq-main.component';
import { RfqAllrfqsComponent } from './rfq-allrfqs/rfq-allrfqs.component';
import { RequisitonedRfqComponent } from './requisitoned-rfq/requisitoned-rfq.component';
import { AddRfqComponent } from './add-rfq/add-rfq.component';
import { MaterialModule } from 'src/app/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewRfqComponent } from './view-rfq/view-rfq.component';
import { CreateRequisitionComponent } from './create-requisition/create-requisition.component';
import { VendorResponseComponent } from './vendor-response/vendor-response.component';
import { OrderDetailsOfVendorComponent } from './order-details-of-vendor/order-details-of-vendor.component';
import { AddNewItemsComponent } from './add-new-items/add-new-items.component';


@NgModule({
  declarations: [
    RfqMainComponent,
    RfqAllrfqsComponent,
    RequisitonedRfqComponent,
    AddRfqComponent,
    ViewRfqComponent,
    CreateRequisitionComponent,
    VendorResponseComponent,
    OrderDetailsOfVendorComponent,
    AddNewItemsComponent
  ],
  imports: [
    CommonModule,
    RfqRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RfqModule { }
