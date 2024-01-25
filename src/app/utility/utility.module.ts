import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxesModule, DateModule, FormFieldModule, InputModule, InputNumberModule, MultipleSelectModule, PasswordModule, RadiosModule, SelectModule, TextAreaModule } from './controls';
import { ButtonModule } from './buttons/button/button.module';
import { DataTableModule } from './table/data-table/data-table.module';
import { SearchComponent } from './components/search/search.component';
import { FormDetailModule } from './table/form-detail/form-detail.module';
import { TableExceptPagesModule } from './table/table-except-pages/table-except-pages.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InputModule,
    InputNumberModule,
    FormFieldModule,
    PasswordModule,
    DateModule,
    CheckboxesModule,
    RadiosModule,
    ButtonModule,
    TextAreaModule,
    DataTableModule,
    SelectModule,
    MultipleSelectModule,
    FormDetailModule,
    TableExceptPagesModule
  ],
  exports: [
    SearchComponent,
    SharedModule,
    InputModule,
    InputNumberModule,
    FormFieldModule,
    PasswordModule,
    DateModule,
    CheckboxesModule,
    RadiosModule,
    ButtonModule,
    TextAreaModule,
    DataTableModule,
    SelectModule,
    MultipleSelectModule,
    FormDetailModule,
    TableExceptPagesModule

  ]
})
export class UtilityModule { }
