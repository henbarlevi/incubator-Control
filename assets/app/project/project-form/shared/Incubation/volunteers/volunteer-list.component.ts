/*
component that display the 'volunteerד' 
volunteers  - object array , each object is a volunteer 
each volunteer  diplayed its name, email ,job props and 2 buttons of 'delete' and 'edit'
delete button - when clicking the volunteer  will be transferd to the onEdit method that
will buble the volunteer  outside, the volunteer  should be delete from outside
edit button - when clicking the volunteer  will be transferd to the onDelete method that
will buble the volunteer  outside, the volunteer  should be Edited from outside
 */
import { Component, EventEmitter, Input, Output ,OnInit} from '@angular/core';
@Component({
  selector: 'volunteer-list',
  template: `
     <div class="panel panel-default">
      <table class="table table-striped table-hover">
        <thead>
        <tr>
          <th>שם מלא</th>
          <th>טלפון</th>
          <th>מייל</th>
          <th>תפקיד</th>
          <th>ערוך/מחק</th>
        </tr>
       </thead>
       <tbody>
        <tr *ngFor="let volunteer of volunteers">
         <td> {{volunteer.firstName}} {{volunteer.lastName}} </td>
         <td>{{volunteer.phone}}</td>
         <td> {{volunteer.email}}</td> 
         <td>{{volunteer.job}} </td>
         <td>{{volunteer.status}} </td>
         
         <td>
            <button type="button" (click)="onEdit(volunteer)"
              class="btn btn-primary">ערוך</button>
            <button type="button" (click)="onRemove(volunteer)"
              class="btn btn-danger">מחק</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
   
  `,
  styles:[`
  th,td{
    text-align:center;
  }
  `]
  //required - the field is required
}) //button type="button" IMPORTANT -in order to prevent the defualt behavior of submiting when clicking on any button in the form 
  //(event if its not type="submit") we declared it as type="button"

export class VolunteerListComponent implements OnInit{



  @Input() volunteers=[];//2 way binding prop that contain the details of the project Members
  @Output() remove = new EventEmitter<Object>();//raise the member clicked to the outer wrapping component (event binding)
  @Output() edit = new EventEmitter<Object>();//raise the member clicked to the outer wrapping component (event binding)
  
  constructor() { 
  }
  ngOnInit() {
    //initialize the members prop - to prevent null error case 
  }
  onRemove(volunteer) {

    this.remove.emit(volunteer);
  }
  onEdit(volunteer) {

    this.edit.emit(volunteer);
  }

}