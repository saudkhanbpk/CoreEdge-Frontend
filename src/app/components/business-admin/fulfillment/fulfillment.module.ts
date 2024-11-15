import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FulfillmentRoutingModule } from './fulfillment-routing.module';
import { FulfillmentTasksComponent } from './fulfillment-tasks/fulfillment-tasks.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material';


@NgModule({
  declarations: [
    FulfillmentTasksComponent
  ],
  imports: [
    CommonModule,
    FulfillmentRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class FulfillmentModule { }
