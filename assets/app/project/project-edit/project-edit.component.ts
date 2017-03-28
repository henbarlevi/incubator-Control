import { Component, OnInit, OnDestroy, OnChanges, ViewChild } from '@angular/core';
import { Project } from '../shared/project.interface'; //project model interface
import { GlobalVariablesService } from '../../shared/global-variables.service'; //service that contains global vars like baseUrl and more
import { ProjectService } from '../shared/project.service';
import { ComboboxesOptionsService } from '../../shared/combobox-options.service';//in order to load combobox options from the server
import { Router, ActivatedRoute } from '@angular/router'; //to navigate to other page when Post project succeded
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'project-edit',
    templateUrl: './project-edit.component.html'
    //1.to use the ngModel with forms we need to install the package @angular/forms (look in package.json)
    //and include it in the app.module imports
    //2.input using ngModel have to have its name set or the form
    //    control must be defined as 'standalone' in ngModelOptions
    //3.required - validation of the field made by the browser itself (we cant depend on it)
    //4. the classes added to the input and btn are for the bootstrap style
    , styleUrls: ['./project-edit.component.css', '../../shared/buttons-style.css']
})
export class ProjectEditComponent implements OnInit, OnDestroy {

    project;// project model, will contain all the project details pulled from server

    formData: FormData = new FormData(); //key value pairs for the uploaded files of the project https://developer.mozilla.org/en-US/docs/Web/API/FormData
    errors; //contain errors that coming back from the server (in case there are)
    paramsSubscription: Subscription;

    @ViewChild('incubationChangeDetection') incubationComponent;

    constructor(private globalVariablesService: GlobalVariablesService,
        private projectService: ProjectService,
        private comboboxesOptionsService: ComboboxesOptionsService,
        private router: Router,
        private route: ActivatedRoute, //represent the route that is currently in use
    ) {
        //this.project = this.globalVariablesService.routingReservationData;

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
            incubation: {
                verificationAnalysis: {},
                volunteers: [],
                businessProgram: {},
                marketingStrategy: {},
                productCharacterization: {},
                productDesign: {},
                productDevelopment: {},
                poc: {},
                marketing: {},
            }
        }
        //getting the projectid route param and sending getProjectById http req to get project full details
        this.paramsSubscription = this.route.params.subscribe(params => {
            console.log('the route params');
            console.log(params);
            this.projectService.getProjectById(params['projectId'])
                .then(res => {
                    this.project = res;
                    console.log('res from getProjectById');
                    console.log(res);
                });
        });
    }
    ngOnDestroy() {
        console.log('calling on OnDestroy in project-edit component');
        this.paramsSubscription.unsubscribe();//preventing memory leak
    }
    //NOTICE   If you call data.append('file', file) multiple times your request will contain an array of your files.
    // Myself using node.js and multipart handler middleware multer get the data as follows:
    //http://stackoverflow.com/questions/12989442/uploading-multiple-files-using-formdata

    //in each change of choosing file in the <input type="file" it will call this func in order to change the file saved in the formData
    /**saves files into the FormData (formdata- key value pair https://developer.mozilla.org/en-US/docs/Web/API/FormData/append) */
    private saveFileToFormData(name, event) {//name - key , event - containing the file from the <input type=file>
        var target = event.target || event.srcElement;//for cross browser - http://stackoverflow.com/questions/5301643/how-can-i-make-event-srcelement-work-in-firefox-and-what-does-it-mean
        var file = target.files[0];
        //appending file into formdata:
        this.formData.append(name, file, file.name);
        console.log('file' + file.name + ' appended to formdata');//DEBUG

    }
    //in each change of choosing file in the <input multipile type="file" it will call this func in order to save the files in the formData 
    private saveMultiFilesToFormData(name, event) {//name - key , event - containing the file from the <input type=file>
        var target = event.target || event.srcElement;//for cross browser - http://stackoverflow.com/questions/5301643/how-can-i-make-event-srcelement-work-in-firefox-and-what-does-it-mean
        var filesLength = target.files.length; //getting the amount of files in order to iterate them
        //appending files into formdata:
        for (var i = 0; i < filesLength; i++) {
            let file = target.files[i];
            this.formData.append(name, file, file.name);
            console.log('file' + file.name + ' appended to formdata');//DEBUG
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

        console.log('this is the incubation inside incubation component');
        console.log(this.incubationComponent.incubation);
        console.log('this is the incubation inside project object');
        console.log(this.project.incubation);


    }
    //when clicking on one of the "צפה בקובץ" button - will download the relevant file
    downloadfile(fieldName) {
        this.projectService.downloadFile(fieldName, this.project);
    }

    onSubmit(f) {
        if (this.isProjectProgramContains('אינקובציה')) {
            this.project.incubation = this.incubationComponent.incubation; //update the incubation
        }
        console.log('form details:');
        console.log(f);
        console.log('should submit:');
        console.log(this.project); //DEBUG

        //suppose to send HTTP PATCH request to server:
        this.projectService.updateProject(this.project).then(res => console.log(res))
    }
}
