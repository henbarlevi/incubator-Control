/*Combo box that have the 'business status'  project options  
	בתהליך
	הצלחה
	אי הצלחה
	חברה בוגרת עם מכירות
 select - 2 way binding prop that change the option chosen in the combo box
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalVariablesService } from '../../../../shared/global-variables.service'; //service that contain the combobox options and other global vars

@Component({
    selector: 'business-status-select',
    template: `
    <div class="form-div form-group">
    <label for="businessStatuses" class="cols-sm-2 control-label form-label"> :  תוצאות הפעילות </label>
    <select class="form-control" name="businessStatuses" [ngModel]="selected" (ngModelChange)="onSelectedChange($event)" >
      <option *ngFor="let status of businessStatuses" [value]="status">
        {{status}} 
      </option>
    </select>
    </div>
  `
})
/*the component load the combo box options from the GlobalVariablesService
  and stores it in the statuses prop
  the chosen value from combobox stored in the selected prop and in each
  change the value bubled with the selectedChange EventEmitter
*/
export class BusinessStatusSelectComponent {

    @Input() selected: string; //2 way binding prop that change the option chosen in the combo box
    @Output() selectedChange = new EventEmitter<string>(); //raise changes of selection to the outer wrapping component (event binding)

    businessStatuses: string[]; //contain combobox options

    constructor(private globalVariables: GlobalVariablesService) {
    }
    ngOnInit() {
        this.businessStatuses = ['בתהליך','הצלחה','אי הצלחה'];//options of the combo-box
    }
    //on each selection change the value of the combo box will raise to the outside (event binding)
    onSelectedChange(selected: string) {
        this.selected = selected; //change the selected prop value to the chosen value
        this.selectedChange.emit(selected);//raise chosen value of the combobox with event
    }
}