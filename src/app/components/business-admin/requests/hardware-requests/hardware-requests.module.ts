import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HardwareRequestsRoutingModule } from './hardware-requests-routing.module';
import { RequestsMainComponent } from './requests-main/requests-main.component';
import { PendingRequestsComponent } from './pending-requests/pending-requests.component';
import { CompletedRequestsComponent } from './completed-requests/completed-requests.component';
import { RejectedRequestsComponent } from './rejected-requests/rejected-requests.component';
import { MaterialModule } from 'src/app/material';
import { CancelledRequestsComponent } from './cancelled-requests/cancelled-requests.component';
import { ViewRequestComponent } from './view-request/view-request.component';


@NgModule({
  declarations: [
    RequestsMainComponent,
    PendingRequestsComponent,
    CompletedRequestsComponent,
    RejectedRequestsComponent,
    CancelledRequestsComponent,
    ViewRequestComponent
  ],
  imports: [
    CommonModule,
    HardwareRequestsRoutingModule,
    MaterialModule
  ]
})
export class HardwareRequestsModule { }
