/*Combo box that have the 'event ref status'  project options  
	הוזמן
	השתתף
	לא השתתף
	חברה בוגרת עם מכירות
 select - 2 way binding prop that change the option chosen in the combo box
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalVariablesService } from '../../../../shared/global-variables.service'; //service that contain the combobox options and other global vars

@Component({
    selector: 'event-status-select',
    template: `
    <div class="form-div form-group">
    <label for="status" class="cols-sm-2 control-label form-label"> : סטטוס </label>
    <select class="form-control" name="eventStatuses" [ngModel]="selected" (ngModelChange)="onSelectedChange($event)" required>
      <option *ngFor="let status of eventStatuses" [value]="status">
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
export class EventStatusSelectComponent {

    @Input() selected: string; //2 way binding prop that change the option chosen in the combo box
    @Output() selectedChange = new EventEmitter<string>(); //raise changes of selection to the outer wrapping component (event binding)

    eventStatuses: string[]; //contain combobox options

    constructor(private globalVariables: GlobalVariablesService,
     ) {
    }
    ngOnInit() {
        this.eventStatuses = ['הוזמן','השתתף','לא השתתף'];//options of the combo-box
    }
    //on each selection change the value of the combo box will raise to the outside (event binding)
    onSelectedChange(selected: string) {
        this.selected = selected; //change the selected prop value to the chosen value
        this.selectedChange.emit(selected);//raise chosen value of the combobox with event
    }
}