import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesTableComponent } from './roles-table/roles-table.component';
import { RolesFormComponent } from './roles-form/roles-form.component';
import { MaterialModule } from 'src/app/material';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RolesTableComponent,
    RolesFormComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class RolesModule { }
