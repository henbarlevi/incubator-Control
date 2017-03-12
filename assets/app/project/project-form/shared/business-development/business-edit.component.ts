/*
container that let fill the details of an business-development (customer name , date etc..)
that bind to the business prop
and  'save' button,
when click 'save' button the business prop bubled to outer environment with
the save EventEmitter
 */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
//import { Member} from'../../shared/member.interface';
@Component({
  selector: 'business-edit',
  template: `
   <div class="panel panel-primary">
      <div class="panel-body">
        שם הלקוח
        <input type="text" [(ngModel)]="business.customerName"
          placeholder="שם האירוע  " required #customerNameField="ngModel">
        תאריך התחלה
        <input type="date" [(ngModel)]="business.startDate"
          placeholder=" תאריך התחלה" >
       תאריך סיום
        <input type="date" [(ngModel)]="business.endDate"
          placeholder=" תאריך סיום " >
        <business-status-select [(selected)] = "business.status"></business-status-select>
        <button type="button" [disabled]="customerNameField.invalid" (click)="onSave()" class="btn btn-primary">שמור</button>
      </div>
    </div>
  `,
  styles:[`
 
  `] 
  //required - the field is required
  //button type="button" IMPORTANT -in order to prevent the defualt behavior of submiting when clicking on any button in the form 
  //(event if its not type="submit") we declared it as type="button"
})
export class BusinessEditComponent implements OnInit {


  @Input() business = { };
  @Output() save = new EventEmitter<Object>();//raise changes of selection to the outer wrapping component (event binding)


  constructor() {}
  ngOnInit() {}
  
 //Raise every time clicking on save button.
  onSave() {
       console.log(this.business);//DEBUG  
    this.save.emit(this.business);
    //clearing the inputs, in order to clear the refrence and point to new member:
  }
}