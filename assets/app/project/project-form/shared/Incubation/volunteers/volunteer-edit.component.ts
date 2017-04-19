/*
container that let fill the details of a volunteer  (name,email,job)
that bind to the volunteer  prop
and  'save' button,
when click 'save' button the volunteer prop bubled to outer environment with
the save EventEmitter
 */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
@Component({
  selector: 'volunteer-edit',
  template: `
   <div class="panel panel-primary">
      <div class="panel-body">
        <input type="text" [(ngModel)]="volunteer.firstName"
          placeholder="שם פרטי  " >
        <input type="text" [(ngModel)]="volunteer.lastName"
          placeholder=" שם משפחה">
          <input type="text" [(ngModel)]="volunteer.phone"
          placeholder=" טלפון ">
        <input type="text" [(ngModel)]="volunteer.email"
          placeholder=" אימייל">
        <input type="text" [(ngModel)]="volunteer.job"
          placeholder=" שם תפקיד ">
        <volunteer-status-select [(selected)]="volunteer.status"></volunteer-status-select>
        <button type="button" (click)="onSave()" class="btn btn-primary">שמור</button>
      </div>
    </div>
  `,
  styles:[`
 
  `] 
  //required - the field is required
  //button type="button" IMPORTANT -in order to prevent the defualt behavior of submiting when clicking on any button in the form 
  //(event if its not type="submit") we declared it as type="button"
})
export class VolunteerEditComponent implements OnInit {


  @Input() volunteer  = {};
  @Output() save = new EventEmitter<Object>();//raise changes of selection to the outer wrapping component (event binding)


  constructor() {}
  ngOnInit() {}
  
 //Raise every time clicking on save button.
  onSave() {
    this.save.emit(this.volunteer );
  }
}