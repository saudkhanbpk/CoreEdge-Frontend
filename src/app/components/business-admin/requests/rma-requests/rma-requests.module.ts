import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RmaRequestsRoutingModule } from './rma-requests-routing.module';
import { RmaRequestsTableComponent } from './rma-requests-table/rma-requests-table.component';
import { EditRmaRequestsComponent } from './edit-rma-requests/edit-rma-requests.component';
import { MaterialModule } from 'src/app/material';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RmaRequestsTableComponent,
    EditRmaRequestsComponent
  ],
  imports: [
    CommonModule,
    RmaRequestsRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class RmaRequestsModule { }
