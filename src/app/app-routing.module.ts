import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
  { path: 'business-admin', loadChildren: () => import('./components/business-admin/business-admin.module').then(m => m.BusinessAdminModule), canActivate: [AuthGuard] },
  { path: 'vendor', loadChildren: () => import('./components/vendor/vendor.module').then(m => m.VendorModule) , canActivate: [AuthGuard]},
  { path: 'sales', loadChildren: () => import('./components/sales/sales.module').then(m => m.SalesModule),  canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
