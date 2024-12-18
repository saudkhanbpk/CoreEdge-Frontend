import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisputesResolutionComponent } from './disputes-resolution/disputes-resolution.component';
import { OpenDisputesComponent } from './open-disputes/open-disputes.component';
import { ResolvedDisputesComponent } from './resolved-disputes/resolved-disputes.component';
import { ResolveOpenDisputesComponent } from './resolve-open-disputes/resolve-open-disputes.component';

const routes: Routes = [
  { path: '', redirectTo: 'dispute-resolution', pathMatch: 'full' },
  {
    path: 'dispute-resolution', component: DisputesResolutionComponent, children: [
      { path: '', redirectTo: 'open-disputes', pathMatch: 'full' },
      { path: 'open-disputes', component: OpenDisputesComponent },
      { path: 'resolved-disputes', component: ResolvedDisputesComponent }
    ]
  },
  { path: 'resolve-open-dispute', component: ResolveOpenDisputesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisputesRoutingModule { }
