import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorDisputeResolutionComponent } from './vendor-dispute-resolution/vendor-dispute-resolution.component';
import { VendorOpenDisputesComponent } from './vendor-open-disputes/vendor-open-disputes.component';
import { VendorResolvedDisputesComponent } from './vendor-resolved-disputes/vendor-resolved-disputes.component';
import { VendorResolveOpenDisputesComponent } from './vendor-resolve-open-disputes/vendor-resolve-open-disputes.component';

const routes: Routes = [
    { path: '', redirectTo: 'vendor-dispute-resolution', pathMatch: 'full' },
    {
      path: 'vendor-dispute-resolution', component: VendorDisputeResolutionComponent, children: [
        { path: '', redirectTo: 'vendor-open-disputes', pathMatch: 'full' },
        { path: 'vendor-open-disputes', component: VendorOpenDisputesComponent },
        { path: 'vendor-resolved-disputes', component: VendorResolvedDisputesComponent }
      ]
    },
    { path: 'vendor-resolve-open-dispute', component: VendorResolveOpenDisputesComponent }
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorDisputeRoutingModule { }
