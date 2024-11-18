import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsMainComponent } from './requests-main/requests-main.component';


@NgModule({
  declarations: [
    RequestsMainComponent
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule
  ]
})
export class RequestsModule { }
