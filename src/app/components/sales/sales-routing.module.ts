import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesMainComponent } from './sales-main/sales-main.component';

const routes: Routes = [
  {
    path: '', component: SalesMainComponent, children: [
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
