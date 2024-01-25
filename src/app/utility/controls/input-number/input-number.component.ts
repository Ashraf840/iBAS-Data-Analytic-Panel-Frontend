import {
  Component,
  OnInit,
  forwardRef,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Component({
  selector: "app-input-number",
  templateUrl: "./input-number.component.html",
  styleUrls: ["./input-number.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true,
    },
  ],
})
export class InputNumberComponent implements OnInit, ControlValueAccessor {
  @Input() max?: number;
  @Input() placeholder: string | undefined;
  @Output() changed = new EventEmitter<string>();
  @Input() id: string | undefined;

  value!: string;
  @Input() isDisabled: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  keyPressNumbers(event: any) {
    // this._utilService.keyPressNumbers(event);
  }

  onKeyup(e: any): void {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
    this.propagateChange(this.value);
    this.changed.emit(this.value);
  }

  onBlur(): void {
    this.propagateTouched();
  }
}
