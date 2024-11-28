import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsMainComponent } from './requests-main/requests-main.component';
import { MaterialModule } from 'src/app/material';
import { HardwareRequestsComponent } from './requests-main/hardware-requests/hardware-requests.component';
import { FormsModule } from '@angular/forms';
import { RmaRequestsComponent } from './requests-main/rma-requests/rma-requests.component';
import { ViewHardwareRequestComponent } from './requests-main/view-hardware-request/view-hardware-request.component';
import { ViewRmaRequestComponent } from './requests-main/view-rma-request/view-rma-request.component';


@NgModule({
  declarations: [
    RequestsMainComponent,
    HardwareRequestsComponent,
    RmaRequestsComponent,
    ViewHardwareRequestComponent,
    ViewRmaRequestComponent
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    MaterialModule,
    FormsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class RequestsModule { }
