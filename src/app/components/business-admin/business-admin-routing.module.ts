import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'catalog', loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule) },
      { path: 'approvals', loadChildren: () => import('./approvals/approvals.module').then(m => m.ApprovalsModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessAdminRoutingModule { }
