/*
component that display the 'seeds' references of a project
seeds - object array , each object is an seed
each seed diplayed its name, date ,location and status props and 2 buttons of 'delete' and 'edit'
delete button - when clicking the seed will be transferd to the onEdit method that
will buble the seed outside, the seed should be delete from outside
edit button - when clicking the seed will be transferd to the onDelete method that
will buble the seed outside, the seed should be Edited from outside
 */
import { Component, EventEmitter, Input, Output ,OnInit} from '@angular/core';
@Component({
  selector: 'seed-list',
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
        <tr *ngFor="let seed of seeds">
         <td> {{seed.customerName}}</td>
         <td>{{seed.startDate}} - {{seed.endDate}}</td>
         <td> {{seed.status}}</td> 
         <td>
            <button type="button" (click)="onEdit(seed)"
              class="btn btn-primary">ערוך</button>
            <button type="button" (click)="onRemove(seed)"
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
  //(even if its not type="submit") we declared it as type="button"

export class SeedListComponent implements OnInit{



  @Input() seeds=[];//2 way binding prop that contain the details of the project events reference
  @Output() remove = new EventEmitter<Object>();//raise the event clicked to the outer wrapping component (event binding)
  @Output() edit = new EventEmitter<Object>();//raise the event clicked to the outer wrapping component (event binding)
  
  constructor() { 

  }
  ngOnInit() {
    //initialize the events prop - to prevent null error case 
  }
  onRemove(seed) {

    this.remove.emit(seed);
  }
  onEdit(seed) {
    this.edit.emit(seed);
  }

}