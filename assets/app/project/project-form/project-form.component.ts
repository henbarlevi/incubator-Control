//the form which the user add a new project

/*references
a way to divide form to multi parts : https://medium.com/@paynoattn/angular2-multipart-forms-with-component-interaction-async-operations-and-validation-b21303785869#.n53d1idi0 
how to upload file:
http://stackoverflow.com/questions/35399617/angular-2-file-upload-from-input-type-file
http://stackoverflow.com/questions/40214772/file-upload-in-angular-2
upload multi files:
http://stackoverflow.com/questions/39608660/angular-2-upload-multiple-files
to handle nested component validation in form -might help :ngOnChanges
https://angular.io/docs/ts/latest/api/core/index/OnChanges-class.html
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../shared/project.interface'; //project model interface
import { GlobalVariablesService } from '../../shared/global-variables.service'; //service that contains global vars like baseUrl and more
import { ProjectService } from '../shared/project.service';
import { ComboboxesOptionsService } from '../../shared/combobox-options.service';//in order to load combobox options from the server
import { FormDataHandlerService } from '../shared/formDataHandler.service';//handle formdata that contain files of project
import { Router } from '@angular/router'; //to navigate to other page when Post project succeded

@Component({
    selector: 'project-form',
    templateUrl: './project-form.component.html',
    //1.to use the ngModel with forms we need to install the package @angular/forms (look in package.json)
    //and include it in the app.module imports
    //2.input using ngModel have to have its name set or the form
    //    control must be defined as 'standalone' in ngModelOptions
    //3.required - validation of the field made by the browser itself (we cant depend on it)
    //4. the classes added to the input and btn are for the bootstrap style
    styleUrls: ['./project-form.component.css', '../../shared/buttons-style.css']
})
export class ProjectFormComponent implements OnInit {

    project: Project;// project model, will contain all the submit values
    formData: FormData = new FormData(); //key value pairs for the uploaded files of the project https://developer.mozilla.org/en-US/docs/Web/API/FormData
    errors; //contain errors that coming back from the server (in case there are)

    //in order to prevent using 2 way binding on incubation component - we take the incubation info only when submiting:
    @ViewChild('incubationChangeDetection') incubationComponent;//refered to the incubation component (to the temlpate variable -incubationChangeDetection (look at project-from.html))

    constructor(private projectService: ProjectService,
        private globalVariablesService: GlobalVariablesService,
        private comboboxesOptionsService: ComboboxesOptionsService,
        private router: Router,
        private formDataHandlerService: FormDataHandlerService) {

        this.projectService.errorHandler = error => this.errors = error;//assign errors that come from the server to the errors prop
    }
    ngOnInit() {
        // initialize project model (in order to prevent undefiend error:
        this.project = {
            projectName: '', //text
            source: '', //text
            petitionDate: Date().toString(), //date presented by string
            crew: [],  //crew members - each object is a member
            status: '', //select (primitive) - TODO change it (and others if needed) to select (object) https://scotch.io/tutorials/how-to-deal-with-different-form-controls-in-angular-2
            projectDomain: [],// multiple select
            filledPitch: { filled: false, filledReminder: '' }, // object contain to fields : filled -bool (checkbox YES/NO) and filledReminder - string date (in case he didnt filled pitch)
            filledQuestions: { filled: false, filledReminder: '' },// object contain to fields : filled -bool (checkbox YES/NO) and filledReminder - string date (in case he didnt filled questions)
            signedFinder: { filled: false, filledReminder: '' }, // object contain to fields : filled -bool (checkbox YES/NO) and filledReminder - string date (in case he didnt filled finder)
            programSuggested: [],// multiple select
            eventsReference: [],//event references of the project
            businessDevelopment: [],//business development of the project
            seedAid: [],
            incubation: {}
        }

    }


    //in each change of choosing file in the <input type="file" it will call this func in order to change the file saved in the FormDataHandlerService
    private saveFileToFormData(name, event) {//name - key , event - containing the file from the <input type=file>
        var target = event.target || event.srcElement;//for cross browser - http://stackoverflow.com/questions/5301643/how-can-i-make-event-srcelement-work-in-firefox-and-what-does-it-mean
        var file = target.files[0];
        //saves file into FormDataHandlerService:
        this.formDataHandlerService.saveFile(name, file, file.name);

    }
    //in each change of choosing file in the <input multipile type="file" it will call this func in order to save the files in the formDataHandlerService 
    private saveMultiFilesToFormData(name, event) {//name - key , event - containing the file from the <input type=file>
        var target = event.target || event.srcElement;//for cross browser - http://stackoverflow.com/questions/5301643/how-can-i-make-event-srcelement-work-in-firefox-and-what-does-it-mean
        var filesLength = target.files.length; //getting the amount of files in order to iterate them
        this.formDataHandlerService.deleteFile(name);//delete previous saved files
        //saving files into FormDataHandlerService:
        for (var i = 0; i < filesLength; i++) {
            let file = target.files[i];
            this.formDataHandlerService.saveMulti(name, file, file.name);
        }

    }
    //get a program name and check if it exist in the project.programSuggested (if user chosed this program from combobox)
    isProjectProgramContains(program) {
        if (this.project.programSuggested.indexOf(program) > -1) {
            return true;
        }
        return false;
    }
    printIncubation() {

        console.log('this is the incubation');

        console.log(this.incubationComponent.incubation);


    }
    onSubmit(f) {
        if (this.isProjectProgramContains('אינקובציה')) {
            this.project.incubation = this.incubationComponent.incubation; //update the incubation
        }
        console.log('form details:');
        console.log(f);
        console.log('should submit:');
        console.log(this.project); //DEBUG
        //post project to server
        this.projectService.addProject(this.project).then(res => {
            console.log('project added :')
            console.log(res.json());//DEBUG
            if (res.ok) {//if the post project to server succeded:
                //TEST the FormDataHandlerService
                this.formDataHandlerService.saveToFormData();
                console.log('uploading the formdata (project files) : ');
                console.log(this.formDataHandlerService.formData);
                this.projectService.uploadFiles(this.formDataHandlerService.formData, res.json()) //send the project related files
                    .then(res => {
                        this.formDataHandlerService.refresh();
                        console.log('response for uploading files');
                        console.log(res);
                        if (res.ok) {//if the post project files to server succeded:
                            this.router.navigate(['dashboard/project-search-page']); //navigate the app to search page   
                        }
                    })
            }
        });

    }
}
