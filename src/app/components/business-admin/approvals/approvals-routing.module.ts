import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalsTableComponent } from './approvals-table/approvals-table.component';
import { ApprovedHardwareRequestsComponent } from './approved-hardware-requests/approved-hardware-requests.component';
import { ApprovedPurchaseRequestsComponent } from './approved-purchase-requests/approved-purchase-requests.component';
import { ApprovedRmaRequestsComponent } from './approved-rma-requests/approved-rma-requests.component';

const routes: Routes = [
  {
    path: '',
    component: ApprovalsTableComponent,
    children: [
      {
        path: '',
        redirectTo: 'approved-hardware-requests',
        pathMatch: 'full',
      },
      {
        path: 'approved-hardware-requests',
        component: ApprovedHardwareRequestsComponent,
      },
      {
        path: 'approved-purchase-requests',
        component: ApprovedPurchaseRequestsComponent,
      },
      {
        path: 'approved-rma-requests',
        component: ApprovedRmaRequestsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovalsRoutingModule {}
