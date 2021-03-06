/*
the page displayed when clicking "מיזמים" in the nav bar.
the page contain a search box for searching projects by name
and a project-list component that diplay responses from the server that contain the projects searched
*/

import { Component, Input } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { GlobalVariablesService } from '../../shared/global-variables.service'; //service that contain the combobox options and other global vars
import { Router } from '@angular/router';
import { CompleterService, CompleterData } from 'ng2-completer';
import { ViewEncapsulation } from '@angular/core';
@Component({
    template: `
        <div class="form-group">
             <div class="col-xs-4" class="form-inline" align="center">
                <ng2-completer [(ngModel)]="searchfield" [datasource]="suggetions" [minSearchLength]="2" inputClass="form-control" inputName="searchField" placeholder="הכנס חיפוש"></ng2-completer>
                <a (click)="search()" class="btn btn-primary btn slk">
                <span class="glyphicon glyphicon-search"></span> חפש 
                </a>
                <search-select [(selected)]="searchBy"></search-select>
            </div>      
        </div>
        
        <button class="btn btn-primary btn-lg slk center-block" (click)="getAllprojects()">הראה הכל</button>
        <project-list (delete)="delete($event)" (edit)="edit($event)" (download)="download($event)" [projects]="projects"></project-list>
    `,//ng2-completer https://www.npmjs.com/package/ng2-completer
    //button desgin from : http://bootsnipp.com/snippets/80GAn
    styleUrls: ['./project-search.component.css', '../../shared/buttons-style.css'],
    encapsulation: ViewEncapsulation.None // in order to override the Autocomplete component css
})
export class ProjectSearchPageComponent {

    searchfield = '';//bind to the search field text input
    searchBy = 'name';//search by paraneter
    projects = []; //contain the projects search result, bind to the project-list component in order to display them
    // Autocomplete:
    protected suggetions: CompleterData //contain a Autocomplete suggestions to search
    constructor(private CompleterService: CompleterService,
        private projectService: ProjectService,
        private router: Router,
        private globalVariablesService: GlobalVariablesService) { //inject services
        this.suggetions = CompleterService.remote('http://localhost:3000/'+ this.globalVariablesService.userDetails.role+'/autocomplete?name=', null, null);//getting from server suggestions for Autocomplete
    }

    //send to server request to get all projects and bind result to the  'projects' prop
    getAllprojects() {
        this.projectService.getProjects().then(res => this.projects = res);
    }
    //send to server request to get all projects that fit to the search value and bind result to the  'projects' prop    
    search() {
        if (this.searchBy === 'name') {
            this.projectService.getProjectsByName(this.searchfield).then(res => this.projects = res).then(res => console.log(res));
        }
        else if (this.searchBy === 'domain') {
            this.projectService.getProjectsByDomain(this.searchfield).then(res => this.projects = res);
        }
    }
    //will execute every time 'הורד קבצים' is clicked on one of the projects, will send a request to download project files
    download(project) {
        this.projectService.downloadProjectFiles(project);
    }
    //will execute every time 'מחק' is clicked on one of the projects, will send a request to delete project
    delete(project) {
        this.projectService.deleteProject(project).then(res => {
            if (res.ok) {//if the project deleted succesfully
                //removing deleted project from the list:
                let index = this.projects.indexOf(project);
                if (index !== -1) {
                    this.projects.splice(index, 1);
                }
            }
        });
    }
    //when clicking on the "ערוך" button on one of the projects- navigate to the project-edit route and sending projectid as route parameter
    edit(project) {
        this.router.navigate(['dashboard/project-edit', project._id]);
    }
}
