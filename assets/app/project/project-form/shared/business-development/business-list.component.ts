/*
component that display the 'events' references of a project
events - object array , each object is an event
each event diplayed its name, date ,location and status props and 2 buttons of 'delete' and 'edit'
delete button - when clicking the event will be transferd to the onEdit method that
will buble the event outside, the event should be delete from outside
edit button - when clicking the event will be transferd to the onDelete method that
will buble the event outside, the event should be Edited from outside
 */
import { Component, EventEmitter, Input, Output ,OnInit} from '@angular/core';
@Component({
  selector: 'business-list',
  template: `
     <div class="panel panel-default">
      <table class="table table-striped table-hover">
        <thead>
        <tr>
          <th>שם הלקוח</th>
          <th>תאריך התחלה\סיום</th>
          <th>סטטוס הפעילות</th>
          <th>ערוך/מחק</th>
        </tr>
       </thead>
       <tbody>
        <tr *ngFor="let business of businesses">
         <td> {{business.customerName}}</td>
         <td>{{business.startDate}} - {{business.endDate}}</td>
         <td> {{business.status}}</td> 
         <td>
            <button type="button" (click)="onEdit(business)"
              class="btn btn-primary">ערוך</button>
            <button type="button" (click)="onRemove(business)"
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

export class BusinessListComponent implements OnInit{



  @Input() businesses=[];//2 way binding prop that contain the details of the project events reference
  @Output() remove = new EventEmitter<Object>();//raise the event clicked to the outer wrapping component (event binding)
  @Output() edit = new EventEmitter<Object>();//raise the event clicked to the outer wrapping component (event binding)
  
  constructor() { 

  }
  ngOnInit() {
    //initialize the events prop - to prevent null error case 
  }
  onRemove(business) {

    this.remove.emit(business);
  }
  onEdit(business) {
    console.log('edit event raised with event from list:');
    console.log(business);    
    this.edit.emit(business);
  }

}