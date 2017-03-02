/*Combo box that have the 'source' מקור, מהיכן הגיע היזם לחממה options fot the project task
	אינטרנט 
	יועץ  -ואז שדה טקסט לשים את שם היועץ 
	ניר עופר 
	אחר – אפשרות לשים מלל חופשי בשדה 
 select - 2 way binding prop that change the option chosen in the combo box
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {GlobalVariablesService } from '../../../shared/global-variables.service'; //service that contain the combobox options and other global vars
import {ComboboxesOptionsService } from '../../../shared/combobox-options.service';

@Component({
  selector: 'source-select',
  template: `
   <div class="form-div form-group">
      <label for="source" class="cols-sm-2 control-label form-label"> : מקור  </label>
      <select class="form-control" name="source" [ngModel]="selected" (ngModelChange)="onSelectedChange($event)" required>
        <option *ngFor="let source of sources" [value]="source">
          {{source}} 
        </option>
      </select>
    </div>
  `//required - the field is required
})
/*the component load the combo box options from the GlobalVariablesService
  and stores it in the sources prop
  the chosen value from combobox stored in the selected prop and in each
  change the value bubled with the selectedChange EventEmitter
*/
export class SourceSelectComponent {

  @Input() selected: string ;//2 way binding prop that change the option chosen in the combo box
  @Output() selectedChange = new EventEmitter<string>();//raise changes of selection to the outer wrapping component (event binding)

  sources: string[]; //contain combobox options

  constructor(private globalVariables:GlobalVariablesService,
      private comboboxesOptionsService: ComboboxesOptionsService) {  
  }
  ngOnInit() {
       //getting all the combobox options from server and assign it to the GlobalVariablesService
         this.comboboxesOptionsService.loadOptions().then(() =>{
            this.sources = this.globalVariables.sourcesOptions;//options of the combo-box
         });
    }
  //on each selection change the value of the combo box will raise to the outside (event binding)
  onSelectedChange(selected: string) {
    this.selected = selected; //change the selected prop value to the chosen value
    this.selectedChange.emit(selected);//raise chosen value of the combobox with event
  }
}