import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisputesRoutingModule } from './disputes-routing.module';
import { DisputesResolutionComponent } from './disputes-resolution/disputes-resolution.component';
import { FormsModule } from '@angular/forms';
import { OpenDisputesComponent } from './open-disputes/open-disputes.component';
import { ResolvedDisputesComponent } from './resolved-disputes/resolved-disputes.component';
import { ViewOpenDisputesComponent } from './view-open-disputes/view-open-disputes.component';
import { ResolveOpenDisputesComponent } from './resolve-open-disputes/resolve-open-disputes.component';
import { MaterialModule } from 'src/app/material';
import { ViewResolvedDisputesComponent } from './view-resolved-disputes/view-resolved-disputes.component';


@NgModule({
  declarations: [
    DisputesResolutionComponent,
    OpenDisputesComponent,
    ResolvedDisputesComponent,
    ViewOpenDisputesComponent,
    ResolveOpenDisputesComponent,
    ViewResolvedDisputesComponent
  ],
  imports: [
    CommonModule,
    DisputesRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class DisputesModule { }
