import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalsRoutingModule } from './approvals-routing.module';
import { ApprovalsMainComponent } from './approvals-main/approvals-main.component';
import { ApprovedPurchaseRequestComponent } from './approved-purchase-request/approved-purchase-request.component';
import { ViewApprovedPurchaseRequestComponent } from './view-approved-purchase-request/view-approved-purchase-request.component';
import { ApprovedRmaRequestComponent } from './approved-rma-request/approved-rma-request.component';
import { ViewApprovedRmaRequestComponent } from './view-approved-rma-request/view-approved-rma-request.component';
import { ApprovedHardwareRequestComponent } from './approved-hardware-request/approved-hardware-request.component';
import { ViewApprovedHardwareRequestComponent } from './view-approved-hardware-request/view-approved-hardware-request.component';
import { MaterialModule } from 'src/app/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ApprovalsMainComponent,
    ApprovedPurchaseRequestComponent,
    ViewApprovedPurchaseRequestComponent,
    ApprovedRmaRequestComponent,
    ViewApprovedRmaRequestComponent,
    ApprovedHardwareRequestComponent,
    ViewApprovedHardwareRequestComponent
  ],
  imports: [
    CommonModule,
    ApprovalsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ApprovalsModule { }
