/*Combo box that have the 'seed result'  project options  
	בתהליך
	הצלחה
	אי הצלחה
 select - 2 way binding prop that change the option chosen in the combo box
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalVariablesService } from '../../../../shared/global-variables.service'; //service that contain the combobox options and other global vars

@Component({
    selector: 'seed-result-button',
    template: `
    <div class="form-div form-group">
    <button type="button" (click)="onSelectedChange('אי הצלחה')" [class.hidden]="selected==='אי הצלחה' || selected===''" class="btn btn-danger">Failed</button>
    <button type="button" (click)="onSelectedChange('הצלחה')" [class.hidden]="selected==='הצלחה'" class="btn btn-success" >Succes</button>    
    </div>
  `
})
/*
*/
export class SeedResultSelectComponent {

    @Input() selected: string; //2 way binding prop that change the option chosen in the combo box
    @Output() selectedChange = new EventEmitter<string>(); //raise changes of selection to the outer wrapping component (event binding)


    constructor(private globalVariables: GlobalVariablesService) {
    }
    ngOnInit() {
        this.selected='הצלחה';
    }
    //on each selection change the value of the combo box will raise to the outside (event binding)
    onSelectedChange(selected: string) {
        this.selected = selected; //change the selected prop value to the chosen value
        console.log(this.selected);
        this.selectedChange.emit(selected);//raise chosen value of the combobox with event
    }
}