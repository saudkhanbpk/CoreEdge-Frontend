import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisputesRoutingModule } from './disputes-routing.module';
import { DisputesResolutionComponent } from './disputes-resolution/disputes-resolution.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DisputesResolutionComponent
  ],
  imports: [
    CommonModule,
    DisputesRoutingModule,
    FormsModule
  ]
})
export class DisputesModule { }
