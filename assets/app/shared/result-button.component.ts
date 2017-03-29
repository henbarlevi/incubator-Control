/*button that have the 'result'  options  
	לא ידוע
	הצלחה
	אי הצלחה
 select - 2 way binding prop that change the option chosen in the combo box
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'result-button',
    template: `
    <div class="form-div form-group">
    <button type="button" (click)="onSelectedChange('הצלחה')" [class.hidden]="selected!=='לא ידוע' && selected!==''" class="btn btn-warning">Unknown</button>    
    <button type="button" (click)="onSelectedChange('אי הצלחה')" [class.hidden]="selected!=='הצלחה'" class="btn btn-success" >Succes</button>    
    <button type="button" (click)="onSelectedChange('לא ידוע')" [class.hidden]="selected!=='אי הצלחה'" class="btn btn-danger">Failed</button>
    </div>
  `
})
/*
*/
export class ResultButtonComponent {

    @Input() selected: string; //2 way binding prop that change the option chosen in the combo box
    @Output() selectedChange = new EventEmitter<string>(); //raise changes of selection to the outer wrapping component (event binding)


    constructor() {
    }
    ngOnInit() {
        this.selected='לא ידוע';
        
    }
    //on each selection change the value of the combo box will raise to the outside (event binding)
    onSelectedChange(selected: string) {
        this.selected = selected; //change the selected prop value to the chosen value
        console.log(this.selected);
        this.selectedChange.emit(selected);//raise chosen value of the combobox with event
    }
}