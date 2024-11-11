import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalsRoutingModule } from './approvals-routing.module';
import { ApprovalsTableComponent } from './approvals-table/approvals-table.component';
import { ApprovalsDetailsComponent } from './approvals-details/approvals-details.component';
import { MaterialModule } from 'src/app/material';


@NgModule({
  declarations: [
    ApprovalsTableComponent,
    ApprovalsDetailsComponent
  ],
  imports: [
    CommonModule,
    ApprovalsRoutingModule,
    MaterialModule
  ]
})
export class ApprovalsModule { }
