import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
export type ButtonType = 'button' | 'submit';
export type ButtonColor = 'basic' | 'primary' | 'danger' | 'warn' | 'accent';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() type: ButtonType | undefined;
  @Input() color: ButtonColor | undefined;
  @Input() isDisabled: boolean = false;

  @Output() myclick = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
    
  }

  onClick(): void {
    this.myclick.emit();
}

}
