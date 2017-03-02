/*
component that display the 'members' 
members - object array , each object is a member
each member diplayed its name, email ,job props and 2 buttons of 'delete' and 'edit'
delete button - when clicking the member will be transferd to the onEdit method that
will buble the member outside, the member should be delete from outside
edit button - when clicking the member will be transferd to the onDelete method that
will buble the member outside, the member should be Edited from outside
 */
import { Component, EventEmitter, Input, Output ,OnInit} from '@angular/core';
//import { Member } from './member.interface';
@Component({
  selector: 'member-list',
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
        <tr *ngFor="let member of members">
         <td> {{member.memberFirstName}} {{member.memberLastName}} </td>
         <td>{{member.memberPhone}}</td>
         <td> {{member.memberEmail}}</td> 
         <td>{{member.memberJob}} </td>
         <td>
            <button type="button" (click)="onEdit(member)"
              class="btn btn-primary">ערוך</button>
            <button type="button" (click)="onRemove(member)"
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

export class MemberListComponent implements OnInit{



  @Input() members=[];//2 way binding prop that contain the details of the project Members
  @Output() remove = new EventEmitter<Object>();//raise the member clicked to the outer wrapping component (event binding)
  @Output() edit = new EventEmitter<Object>();//raise the member clicked to the outer wrapping component (event binding)
  
  constructor() { 
     this.members = [ 
      {
      memberFirstName: 'ss',
      memberLastName: '',
      memberEmail: '',
      memberJob: '',
    },
    ];
  }
  ngOnInit() {
    //initialize the members prop - to prevent null error case 
  }
  onRemove(member) {

    this.remove.emit(member);
  }
  onEdit(member) {

    this.edit.emit(member);
  }

}