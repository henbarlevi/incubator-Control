/*multi select Combo box that have the 'programSuggested' options for the project task
	אינקובציה
	הפניה לארועים
	פיתוח עיסקי 
etc..
 select - 2 way binding prop that change the option chosen in the combo box
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalVariablesService } from '../../../shared/global-variables.service'; //service that contain the combobox options and other global vars
import { ComboboxesOptionsService } from '../../../shared/combobox-options.service';

@Component({
  selector: 'program-multi-select',
  template: `
  <div class=" form-group">
    <label for="programSuggested" class="cols-sm-2 control-label form-label">: : תוכנית המוצעת ליזם </label>
    <select multiple class="form-control" name="programSuggested" [ngModel]="selected" (ngModelChange)="onSelectedChange($event)">
      <option *ngFor="let program of programSuggestions" [value]="program">
      {{program}} 
      </option>
    </select>
  </div>

  `
})
export class ProgramSelectComponent {

  @Input() selected: string[];//2 way binding prop that change the option chosen in the combo box
  @Output() selectedChange = new EventEmitter<string[]>();//raise changes of selection to the outer wrapping component (event binding)

  programSuggestions: string[]//options of the programSuggestions multiselect combo box

  constructor(private globalVariablesService: GlobalVariablesService,
    private comboboxesOptionsService: ComboboxesOptionsService) {  
  }
  ngOnInit() {
       //load all comboxes values:
        this.programSuggestions = this.globalVariablesService.programSuggestions; //load the programSuggestions combobox options 

    }
  //on each selection change the value of the combo box will raise to the parent (event binding)
  onSelectedChange(selected: string[]) {
    this.selected = selected;
    this.selectedChange.emit(selected);
  }
}