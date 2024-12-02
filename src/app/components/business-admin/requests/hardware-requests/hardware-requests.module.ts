import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HardwareRequestsRoutingModule } from './hardware-requests-routing.module';
import { HardwareRequestsTableComponent } from './hardware-requests-table/hardware-requests-table.component';
import { EditHardwareRequestsComponent } from './edit-hardware-requests/edit-hardware-requests.component';
import { MaterialModule } from 'src/app/material';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HardwareRequestsTableComponent,
    EditHardwareRequestsComponent
  ],
  imports: [
    CommonModule,
    HardwareRequestsRoutingModule,
    MaterialModule, FormsModule
  ]
})
export class HardwareRequestsModule { }
