/*
container that let fill the details of an seed (companyvalue, result , date etc..)
that bind to the seed prop
and  'save' button,
when click 'save' button the seed prop bubled to outer environment with
the save EventEmitter
 */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
//import { Member} from'../../shared/member.interface';
@Component({
  selector: 'seed-edit',
  template: `
   <div class="panel panel-primary">
      <div class="panel-body">
        גובה ההשקעה
        <input type="number" [(ngModel)]="seed.investmentAmount"
          placeholder="גובה ההשקעה " required #investmentAmountField="ngModel">
        שווי החברה
        <input type="number" [(ngModel)]="seed.companyValue"
          placeholder="שווי החברה " >
        תאריך התחלה
        <input type="date" [(ngModel)]="seed.startDate"
          placeholder=" תאריך התחלה" >
       תאריך סיום
        <input type="date" [(ngModel)]="seed.endDate"
          placeholder=" תאריך סיום " >
        שם האירוע
        <input type="text" [(ngModel)]="seed.eventName"
          placeholder="שם האירוע " required #customerNameField="ngModel">
        <seed-status-select [(selected)] = "seed.status"></seed-status-select>
        <button type="button" [disabled]="investmentAmountField.invalid" (click)="onSave()" class="btn btn-primary">שמור</button>
      </div>
    </div>
  `,
  styles:[`
 
  `] 
  //required - the field is required
  //button type="button" IMPORTANT -in order to prevent the defualt behavior of submiting when clicking on any button in the form 
  //(event if its not type="submit") we declared it as type="button"
})
export class SeedEditComponent implements OnInit {


  @Input() seed = { };
  @Output() save = new EventEmitter<Object>();//raise changes of selection to the outer wrapping component (event binding)


  constructor() {}
  ngOnInit() {}
  
 //Raise every time clicking on save button.
  onSave() {
       console.log(this.seed);//DEBUG  
    this.save.emit(this.seed);
    //clearing the inputs, in order to clear the refrence and point to new member:
  }
}