import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsMainComponent } from './requests-main/requests-main.component';
import { MaterialModule } from 'src/app/material';
import { FormsModule } from '@angular/forms';
import { ViewHardwareRequestComponent } from './hardware-requests/view-hardware-request/view-hardware-request.component';
import { ViewRmaRequestComponent } from './rma-requests/view-rma-request/view-rma-request.component';


@NgModule({
  declarations: [
    RequestsMainComponent,
    ViewHardwareRequestComponent,
    ViewRmaRequestComponent,
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
