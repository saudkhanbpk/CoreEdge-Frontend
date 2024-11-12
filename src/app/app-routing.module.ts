import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
  { path: 'business-admin', loadChildren: () => import('./components/business-admin/business-admin.module').then(m => m.BusinessAdminModule) },
  { path: 'vendor', loadChildren: () => import('./components/vendor/vendor.module').then(m => m.VendorModule) },
  { path: 'sales', loadChildren: () => import('./components/sales/sales.module').then(m => m.SalesModule) },
  

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
