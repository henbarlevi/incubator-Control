/*this is where the admin can signup new editor/watcher users */
/*
component that let create new users account
 */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { GlobalVariablesService } from '../shared/global-variables.service'; //service that contain the combobox options and other global vars
import { ControlPanelService} from './control-panel.service';
import { Router } from '@angular/router'; //to navigate to other page when Post project succeded

@Component({
  selector: 'admin-users-panel',
  templateUrl: './admin-users-panel.component.html',
  styleUrls:['../shared/buttons-style.css','./admin-users-panel.component.css'] 

})
export class AdminUsersPanelComponent implements OnInit {


  @Input() signupUser = {}; //bind to the insertion of the inputs in the form
  users = []; //bind to the users objects that come from the server
  
  constructor(private controlPanelService:ControlPanelService,
               private router: Router) {}//inject services
  ngOnInit() {
    this.controlPanelService.getUsers().then(res=> this.users=res.users);
  }
  
   onSubmit(f) {
        console.log('form details:');
        console.log(f);
        console.log('should submit:');
        console.log(this.signupUser); //DEBUG

        //send http post request to server:
        this.controlPanelService.addUser(this.signupUser)
        .then(res=>{
          if(res.ok){
             this.router.navigate(['dashboard/home']); //navigate the app to search page   
          }
        });
    }
}