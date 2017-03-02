/*multi select Combo box that have the 'domain' options for the project task
	Gaming
	Technology
	Lifestyle
etc..
 select - 2 way binding prop that change the option chosen in the combo box
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalVariablesService } from '../../../shared/global-variables.service'; //service that contain the combobox options and other global vars
import { ComboboxesOptionsService } from '../../../shared/combobox-options.service';

@Component({
  selector: 'domain-multi-select',
  template: `
  <div class="form-div form-group">
    <label for="projectDomain" class="cols-sm-2 control-label form-label">: תחום/דומיין הפרוייקט </label><br/>
    <select multiple class="form-control" name="projectDomain" [ngModel]="selected" (ngModelChange)="onSelectedChange($event)">
      <option *ngFor="let domain of domains" [value]="domain">
        {{domain}} 
      </option>
    </select>
  </div>
  `
})
export class DomainSelectComponent {

  @Input() selected: string[];//2 way binding prop that change the option chosen in the combo box
  @Output() selectedChange = new EventEmitter<string[]>();//raise changes of selection to the outer wrapping component (event binding)

  domains: Object[]; //contain combobox options

  constructor(private globalVariables: GlobalVariablesService,
    private comboboxesOptionsService: ComboboxesOptionsService) {  
    //this.domains = globalVariables.domainOptions;//options of the combo-box
  }
  ngOnInit() {
       //getting all the combobox options from server and assign it to the GlobalVariablesService
         this.comboboxesOptionsService.loadOptions().then(() =>{
            this.domains = this.globalVariables.domainOptions;//options of the combo-box
         });
    }
  //on each selection change the value of the combo box will raise to the outside (event binding)
  onSelectedChange(selected: string[]) {
    this.selected = selected;
    this.selectedChange.emit(selected);
  }
}