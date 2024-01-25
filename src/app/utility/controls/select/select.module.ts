import { NgModule } from '@angular/core';
import { SelectComponent } from './select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [SelectComponent],
    imports: [
        NgSelectModule,
        FormsModule,
        SharedModule,
        CommonModule
        
    ],
    exports: [
        SelectComponent
    ]
})
export class SelectModule { }
