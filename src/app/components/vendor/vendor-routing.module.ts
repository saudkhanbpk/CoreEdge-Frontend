import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorMainComponent } from './vendor-main/vendor-main.component';

const routes: Routes = [
  {
    path: '', component: VendorMainComponent, children: [
      { path: '', redirectTo: 'vendor-dashboard', pathMatch: 'full' },
      { path: 'vendor-dashboard', loadChildren: () => import('./vendor-dashboard/vendor-dashboard.module').then(m => m.VendorDashboardModule) },
      { path: 'vendor-catalog', loadChildren: () => import('./vendor-catalog/vendor-catalog.module').then(m => m.VendorCatalogModule) }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
