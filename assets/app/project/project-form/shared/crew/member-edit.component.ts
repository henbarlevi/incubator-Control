/*
container that let fill the details of a member (name,email,job)
that bind to the member prop
and  'save' button,
when click 'save' button the member prop bubled to outer environment with
the save EventEmitter
 */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
//import { Member} from'../../shared/member.interface';
@Component({
  selector: 'member-edit',
  template: `
   <div class="panel panel-primary">
      <div class="panel-body">
        <input type="text" [(ngModel)]="member.memberFirstName"
          placeholder="שם פרטי  " style="width: 15%;">
        <input type="text" [(ngModel)]="member.memberLastName"
          placeholder=" שם משפחה" style="width: 15%;">
          <input type="text" [(ngModel)]="member.memberPhone"
          placeholder=" טלפון " style="width: 15%;">
        <input type="text" [(ngModel)]="member.memberEmail"
          placeholder=" אימייל" style="width: 15%;">
        <input type="text" [(ngModel)]="member.memberJob"
          placeholder=" שם תפקיד " style="width: 15%;">
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
export class MemberEditComponent implements OnInit {


  @Input() member = { memberFirstName:'',memberLastName:'',memberEmail:'',memberJob:''};
  @Output() save = new EventEmitter<Object>();//raise changes of selection to the outer wrapping component (event binding)


  constructor() {}
  ngOnInit() {}
  
 //Raise every time clicking on save button.
  onSave() {
       console.log(this.member);//DEBUG  
    this.save.emit(this.member);
  }
}