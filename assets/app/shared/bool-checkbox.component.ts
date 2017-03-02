import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'status-select',
  template: `
    <label> Status </label>
    <select [ngModel]="selected" (ngModelChange)="onSelectedChange($event)">
      <option *ngFor="let source of sources" [value]="source">
        {{source}} 
      </option>
    </select>

    <div>
    <label>
        <input type="checkbox" name="isActive"  [(ngModel)]="user.isActive">
        Is Active
    </label>
    </div>
  `
})
export class SourceSelectComponent {
    @Input() label:string;

  @Input() selected: string ; //2 way binding prop that change the option chosen in the combo box
  @Output() selectedChange = new EventEmitter<string>(); //raise changes of selection to the outer wrapping component (event binding)

  sources: string[]; //contain combobox options

  constructor() {
    this.sources = globalVariables.statusOptions;//options of the combo-box
  }
  //on each selection change the value of the combo box will raise to the outside (event binding)
  onSelectedChange(selected: string) {
    this.selected = selected;
    this.selectedChange.emit(selected);
  }
}