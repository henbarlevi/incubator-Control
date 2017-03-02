/*Combo box that have the search project options  
חיפוש לפי
	שפ
	תחום

 select - 2 way binding prop that change the option chosen in the combo box
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
//import { GlobalVariablesService } from '../../shared/global-variables.service'; //service that contain the combobox options and other global vars

@Component({
    selector: 'search-select',
    template: `
    <div class="form-div form-group">
    <select class="form-control mdb-select" name="search" [ngModel]="selected" (ngModelChange)="onSelectedChange($event)" required>
      <option [value]="'name'">
        לפי שם 
      </option>
       <option [value]="'domain'">
        לפי תחום 
      </option>
    </select>

    </div>
  `,
  styles:[`
  select{
      height:2.5em;
  }
  `]
})

export class SearchSelectComponent {

    @Input() selected: string; //2 way binding prop that change the option chosen in the combo box
    @Output() selectedChange = new EventEmitter<string>(); //raise changes of selection to the outer wrapping component (event binding)


    constructor() {

    }
    ngOnInit() {

    }
    //on each selection change the value of the combo box will raise to the outside (event binding)
    onSelectedChange(selected: string) {
        this.selected = selected; //change the selected prop value to the chosen value
        this.selectedChange.emit(selected);//raise chosen value of the combobox with event
    }
}