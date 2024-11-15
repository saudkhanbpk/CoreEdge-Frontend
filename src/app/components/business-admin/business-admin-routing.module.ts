import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'catalog', loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule) },
      { path: 'employees', loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule) },
      { path: 'vendors', loadChildren: () => import('./vendors/vendors.module').then(m => m.VendorsModule) },
      { path: 'purchase-request', loadChildren: () => import('./purchase-requests/purchase-requests.module').then(m => m.PurchaseRequestsModule) },
      { path: 'hardware-requests', loadChildren: () => import('./hardware-requests/hardware-requests.module').then(m => m.HardwareRequestsModule) },
      { path: 'vendor-invoice', loadChildren: () => import('./vendor-invoice/vendor-invoice.module').then(m => m.VendorInvoiceModule) },
      { path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule) },
      { path: 'approvals', loadChildren: () => import('./approvals/approvals.module').then(m => m.ApprovalsModule) },
      { path: 'purchase-orders', loadChildren: () => import('./purchase-orders/purchase-orders.module').then(m => m.PurchaseOrdersModule) },
      { path: 'receiving', loadChildren: () => import('./receiving/receiving.module').then(m => m.ReceivingModule) },
      { path: 'fulfillment', loadChildren: () => import('./fulfillment/fulfillment.module').then(m => m.FulfillmentModule) },
      { path: 'rma', loadChildren: () => import('./rma/rma.module').then(m => m.RmaModule) },
      { path: 'disputes', loadChildren: () => import('./disputes/disputes.module').then(m => m.DisputesModule) },
      { path: 'roles', loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessAdminRoutingModule { }
