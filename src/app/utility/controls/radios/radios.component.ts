import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ControlItem, Value } from 'src/app/models';


@Component({
    selector: 'app-radios',
    templateUrl: './radios.component.html',
    styleUrls: ['./radios.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadiosComponent),
            multi: true
        }
    ]
})
export class RadiosComponent implements OnInit, ControlValueAccessor {

    @Input() items: ControlItem[] = [];
    @Input() isNewLineItem: boolean = true;
    @Output() changed = new EventEmitter<Value>();

    value: Value | undefined;
    isDisabled: boolean = false;

    constructor() { }

    ngOnInit(): void {
        
    }

    private propagateChange: any = () => { };

    writeValue(value: Value): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    onChanged(value: Value): void {
        this.value = value;
        this.propagateChange(value);
        this.changed.emit(value);
    }

    isChecked(value: Value): boolean {
        return this.value === value;
    }

}
