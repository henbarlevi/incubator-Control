/*
container that let fill the details of an event (name , date etc..)
that bind to the event prop
and  'save' button,
when click 'save' button the event prop bubled to outer environment with
the save EventEmitter
 TO USE LOCATION GOOGLE MAP API - https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
 */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
//import { Member} from'../../shared/member.interface';
@Component({
  selector: 'event-edit',
  template: `
   <div class="panel panel-primary">
      <div class="panel-body">
        שם האירוע
        <input type="text" [(ngModel)]="event.name"
          placeholder="שם האירוע  " required #eventNameField="ngModel">
        תאריך התחלה
        <input type="date" [(ngModel)]="event.startDate"
          placeholder=" תאריך התחלה" >
       תאריך סיום
        <input type="date" [(ngModel)]="event.endDate"
          placeholder=" תאריך סיום " >
        מקום האירוע
        <input type="text" [(ngModel)]="event.location"
          placeholder=" מקום האירוע" >
        <event-status-select [(selected)] = "event.status"></event-status-select>
        <button type="button" [disabled]="eventNameField.invalid" (click)="onSave()" class="btn btn-primary">שמור</button>
      </div>
    </div>
  `,
  styles:[`
 
  `] 
  //required - the field is required
  //button type="button" IMPORTANT -in order to prevent the defualt behavior of submiting when clicking on any button in the form 
  //(event if its not type="submit") we declared it as type="button"
})
export class EventEditComponent implements OnInit {


  @Input() event = { name:'',startDate:'',endDate:'',location:'' ,status:''};
  @Output() save = new EventEmitter<Object>();//raise changes of selection to the outer wrapping component (event binding)


  constructor() {}
  ngOnInit() {}
  
 //Raise every time clicking on save button.
  onSave() {
       console.log(this.event);//DEBUG  
    this.save.emit(this.event);
    //clearing the inputs, in order to clear the refrence and point to new member:
  }
}