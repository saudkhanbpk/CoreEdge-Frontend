import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessAdminRoutingModule } from './business-admin-routing.module';
import { MainComponent } from './main/main.component';
import { MaterialModule } from 'src/app/material';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BusinessAdminRoutingModule,
    MaterialModule
  ]
})
export class BusinessAdminModule { }
