import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RfqRoutingModule } from './rfq-routing.module';
import { RfqMainComponent } from './rfq-main/rfq-main.component';
import { RfqAllrfqsComponent } from './rfq-allrfqs/rfq-allrfqs.component';
import { RequisitonedRfqComponent } from './requisitoned-rfq/requisitoned-rfq.component';
import { AcceptedRfqComponent } from './accepted-rfq/accepted-rfq.component';
import { RejectedRfqComponent } from './rejected-rfq/rejected-rfq.component';
import { AddRfqComponent } from './add-rfq/add-rfq.component';
import { MaterialModule } from 'src/app/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewRfqComponent } from './view-rfq/view-rfq.component';


@NgModule({
  declarations: [
    RfqMainComponent,
    RfqAllrfqsComponent,
    RequisitonedRfqComponent,
    AcceptedRfqComponent,
    RejectedRfqComponent,
    AddRfqComponent,
    ViewRfqComponent
  ],
  imports: [
    CommonModule,
    RfqRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RfqModule { }
