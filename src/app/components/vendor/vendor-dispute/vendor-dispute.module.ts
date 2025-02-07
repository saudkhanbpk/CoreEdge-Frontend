import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorDisputeRoutingModule } from './vendor-dispute-routing.module';
import { VendorDisputeResolutionComponent } from './vendor-dispute-resolution/vendor-dispute-resolution.component';
import { VendorOpenDisputesComponent } from './vendor-open-disputes/vendor-open-disputes.component';
import { VendorResolveOpenDisputesComponent } from './vendor-resolve-open-disputes/vendor-resolve-open-disputes.component';
import { VendorResolvedDisputesComponent } from './vendor-resolved-disputes/vendor-resolved-disputes.component';
import { VendorViewResolvedDisputesComponent } from './vendor-view-resolved-disputes/vendor-view-resolved-disputes.component';
import { VendorViewOpenDisputesComponent } from './vendor-view-open-disputes/vendor-view-open-disputes.component';
import { MaterialModule } from 'src/app/material';


@NgModule({
  declarations: [
    VendorDisputeResolutionComponent,
    VendorOpenDisputesComponent,
    VendorResolveOpenDisputesComponent,
    VendorResolvedDisputesComponent,
    VendorViewResolvedDisputesComponent,
    VendorViewOpenDisputesComponent
  ],
  imports: [
    CommonModule,
    VendorDisputeRoutingModule,
    MaterialModule
  ]
})
export class VendorDisputeModule { }
