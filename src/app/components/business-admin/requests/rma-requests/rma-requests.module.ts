import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RmaRequestsRoutingModule } from './rma-requests-routing.module';
import { RmaRequestsComponent } from './rma-requests/rma-requests.component';
import { MaterialModule } from 'src/app/material';


@NgModule({
  declarations: [
    RmaRequestsComponent
  ],
  imports: [
    CommonModule,
    RmaRequestsRoutingModule,
    MaterialModule
  ]
})
export class RmaRequestsModule { }
