/*
container that let fill the details of a user (name,email,role)
that bind to the user prop
and  'save' button,
when click 'save' button the user prop bubled to outer environment with
the save EventEmitter
 */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { GlobalVariablesService } from '../../shared/global-variables.service'; //service that contain the combobox options and other global vars

@Component({
  selector: 'user-edit',
  template: `    
      <div class="panel panel-primary">
         <div class="panel-body">
            <div class="col-xs-12 col-sm-6 col-md-3">  
                <input type="text"  [(ngModel)]="user.name" placeholder="User Name" class="form-control">
            </div>

            <div class="col-xs-12 col-sm-6  col-md-3">  
            <input type="text"  [(ngModel)]="user.email" placeholder="Email" class="form-control">    
            </div>

           <div class="col-xs-12 col-sm-6  col-md-3">  
            <input type="text"  [(ngModel)]="user.role" placeholder="Role" class="form-control">
            </div>

            <button type="button" (click)="onSave()" class="btn btn-primary">שמור</button>
        </div>
      </div>
  `,
  styles: [``]

})

export class UserEditComponent implements OnInit {

  

  @Input() user = { firstName:'',lastName:'',email:'',role:''};//2 way binding prop that contain the projects array
   @Output() save = new EventEmitter<Object>();//raise changes of selection to the parent component (event binding)

  constructor(private globalVariablesService: GlobalVariablesService) { }

  ngOnInit() {
    //initialize the members prop - to prevent null error case 
  }
  //Raise every time clicking on save button.
  onSave() { 
    this.save.emit(this.user);
    //clearing the inputs, in order to clear the refrence and point to new member:
    this.user ={ firstName:'',lastName:'',email:'',role:''};
  }

}