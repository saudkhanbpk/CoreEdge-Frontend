import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalsRoutingModule } from './approvals-routing.module';
import { ApprovalsTableComponent } from './approvals-table/approvals-table.component';
import { ApprovalsDetailsComponent } from './approvals-details/approvals-details.component';
import { MaterialModule } from 'src/app/material';
import { ApprovedHardwareRequestsComponent } from './approved-hardware-requests/approved-hardware-requests.component';
import { ApprovedPurchaseRequestsComponent } from './approved-purchase-requests/approved-purchase-requests.component';
import { ApprovedRmaRequestsComponent } from './approved-rma-requests/approved-rma-requests.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ApprovalsTableComponent,
    ApprovalsDetailsComponent,
    ApprovedHardwareRequestsComponent,
    ApprovedPurchaseRequestsComponent,
    ApprovedRmaRequestsComponent,
  ],
  imports: [CommonModule, ApprovalsRoutingModule, MaterialModule, FormsModule],
})
export class ApprovalsModule {}
