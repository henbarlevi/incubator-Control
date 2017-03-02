/*
component that display users list
users - object array , each object is a user
each user diplayed all its details such as : firstname, lastname, role etc..
 */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { GlobalVariablesService } from '../../shared/global-variables.service'; //service that contain the combobox options and other global vars

@Component({
  selector: 'user-list',
  template: `    

  
 <table class="table">
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>      
      <th>Role</th>
      <th>Action</th>      
    </tr>
  </thead>
  <tbody>
    <tr  *ngFor="let user of users; let i = index">
      <th scope="row">{{i}}</th>
      <td>{{user.firstName}}</td>
      <td>{{user.lastName}}</td>
      <td>{{user.email}}</td>      
      <td>{{user.role}}</td>
    <td>
            <button type="button" (click)="onEdit(user)"
              class="btn btn-primary">ערוך</button>
            <button type="button" (click)="onRemove(user)"
              class="btn btn-danger">מחק</button>
          </td>
    </tr>  
  </tbody>
</table>

  `,
  styles: [`
  th,tr{
      text-align:center;
  }
  `]

})

export class UserListComponent implements OnInit {



  @Input() users = [];//2 way binding prop that contain the projects array
  
  @Output() remove = new EventEmitter<Object>(); //raise when clicking on the מחק button on one of the projects, bubbling the project object
  @Output() edit = new EventEmitter<Object>(); //raise when clicking on the  ערוך button on one of the projects, bubbling the project object
  
  constructor(private globalVariablesService: GlobalVariablesService) { }
  
  //when clicking on the "מחק" button -  bubbling the user object with the 'delete' event
  onRemove(user) {
    this.remove.emit(user);
  }
  //when clicking on the "ערוך" button - bubbling the user object with the 'edit' event
  onEdit(user) {
    this.edit.emit(user);    
  }
  ngOnInit() {
    //initialize the members prop - to prevent null error case 
  }


}