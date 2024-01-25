import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumberComponent } from './input-number.component';

@NgModule({
    declarations: [InputNumberComponent],
    imports: [
        CommonModule
    ],
    exports: [
        InputNumberComponent
    ]
})
export class InputNumberModule { }
