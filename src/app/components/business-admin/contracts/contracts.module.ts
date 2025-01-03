import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractsTableComponent } from './contracts-table/contracts-table.component';
import { ContractsFormComponent } from './contracts-form/contracts-form.component';
import { MaterialModule } from 'src/app/material';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    ContractsTableComponent,
    ContractsFormComponent
  ],
  imports: [
    CommonModule,
    ContractsRoutingModule,
    MaterialModule,
    EditorModule
  ]
})
export class ContractsModule { }
