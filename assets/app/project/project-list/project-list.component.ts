/*
component that display projects list
projects - object array , each object is a project
each project diplayed all its details such as : projectName, source, petitionDate etc..
"ערוך" button that on click  - assign the specific project to the routingReservationData var in the GlobalVariablesService
 and navigate route to the project-edit component
 */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { GlobalVariablesService } from '../../shared/global-variables.service'; //service that contain the combobox options and other global vars
import { Router } from '@angular/router';

@Component({
  selector: 'project-list',
  template: `    
    <div *ngFor="let project of projects" class="project-list-div">
      <div class="media ">
              <a class="pull-right" href="#">
                  <img class="media-object dp img-circle" src="http://www.gold-ventures.com/wp-content/uploads/2014/08/logo-home.png" style="width: 100px;height:100px;">
              </a>
              <div class="media-body">
                  <h3 class="media-heading"><b>{{project.projectName}} </b><small> {{project.petitionDate | date:'short'}}</small></h3>
                  <h5>{{project.status}} 
                   <button type="button" (click)="onEdit(project)" class="btn btn-primary ">ערוך</button>
                   <button type="button" (click)="onDelete(project)" class="btn btn-danger ">מחק</button>                   
                   <button type="button" (click)="onDownload(project)" class="btn btn-success ">הורד קבצים</button>                   
                   
                  </h5>
                  <hr style="margin:8px auto">

                  <span *ngFor="let member of project.crew"  class="label label-default">{{member.memberFirstName}} {{member.memberLastName}} - {{member.memberJob}} - {{member.memberPhone}}</span>
              </div>
          </div>

        
    </div>
  `,
  styleUrls: ['./project-list.component.css','../../shared/buttons-style.css']

})

export class ProjectListComponent implements OnInit {



  @Input() projects = [];//2 way binding prop that contain the projects array
  
  @Output() delete = new EventEmitter<Object>(); //raise when clicking on the מחק button on one of the projects, bubbling the project object
  @Output() download = new EventEmitter<Object>(); //raise when clicking on the הורד קבצים button on one of the projects, bubbling the project object
  @Output() edit = new EventEmitter<Object>(); //raise when clicking on the  ערוך button on one of the projects, bubbling the project object
  
  constructor(private router: Router,
    private globalVariablesService: GlobalVariablesService) { }
  
  //when clicking on the "מחק" button -  bubbling the project object with the 'delete' event
  onDelete(project) {
    this.delete.emit(project);
  }
  //when clicking on the "הורד קבצים" button -  bubbling the project object with the 'download' event
  onDownload(project) {
    this.download.emit(project);
  }
  //when clicking on the "ערוך" button - reserve the project into the routingReservationData var and navigate to the project-edit component
  onEdit(project) {
    this.edit.emit(project);    
  }
  ngOnInit() {
    //initialize the members prop - to prevent null error case 
  }


}