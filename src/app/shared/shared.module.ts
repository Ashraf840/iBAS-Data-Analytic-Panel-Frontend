import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../modules/loading-image/loading-image.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoadingImageModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    LoadingImageModule
  ]
})
export class SharedModule { }
