import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalsMainComponent } from './approvals-main/approvals-main.component';
import { ApprovedHardwareRequestComponent } from './approved-hardware-request/approved-hardware-request.component';
import { ApprovedPurchaseRequestComponent } from './approved-purchase-request/approved-purchase-request.component';
import { ApprovedRmaRequestComponent } from './approved-rma-request/approved-rma-request.component';

const routes: Routes = [
  { path: '', redirectTo: 'approvals-main', pathMatch: 'full' },
  {
    path: 'approvals-main', component: ApprovalsMainComponent, children: [
      { path: '', redirectTo: 'approved-hardware-request', pathMatch: 'full' },
      { path: 'approved-hardware-request', component: ApprovedHardwareRequestComponent },
      { path: 'approved-purchase-request', component: ApprovedPurchaseRequestComponent },
      { path: 'approved-rma-request', component: ApprovedRmaRequestComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalsRoutingModule { }
