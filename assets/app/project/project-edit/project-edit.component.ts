import { Component, OnInit, OnChanges } from '@angular/core';
import { Project } from '../shared/project.interface'; //project model interface
import { GlobalVariablesService } from '../../shared/global-variables.service'; //service that contains global vars like baseUrl and more
import { ProjectService } from '../shared/project.service';
import { ComboboxesOptionsService } from '../../shared/combobox-options.service';//in order to load combobox options from the server
import { Router } from '@angular/router'; //to navigate to other page when Post project succeded

@Component({
    selector: 'project-edit',
    templateUrl: './project-edit.component.html'
    //1.to use the ngModel with forms we need to install the package @angular/forms (look in package.json)
    //and include it in the app.module imports
    //2.input using ngModel have to have its name set or the form
    //    control must be defined as 'standalone' in ngModelOptions
    //3.required - validation of the field made by the browser itself (we cant depend on it)
    //4. the classes added to the input and btn are for the bootstrap style
,styleUrls:['./project-edit.component.css', '../../shared/buttons-style.css']
})
export class ProjectEditComponent implements OnInit {

    project ;// project model, will contain all the project details pulled from server
    programSuggestions: string[]//options of the programSuggestions multiselect combo box

    formData: FormData = new FormData(); //key value pairs for the uploaded files of the project https://developer.mozilla.org/en-US/docs/Web/API/FormData
    errors; //contain errors that coming back from the server (in case there are)

    constructor(private globalVariablesService: GlobalVariablesService,
        private projectService: ProjectService,
        private comboboxesOptionsService: ComboboxesOptionsService,
        private router: Router) {
        this.project = this.globalVariablesService.routingReservationData;
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
        }
        this.project = this.globalVariablesService.routingReservationData;
         //load program suggetions comboxes values:
        this.programSuggestions = this.globalVariablesService.programSuggestions; //load the programSuggestions combobox options 

}
    //NOTICE   If you call data.append('file', file) multiple times your request will contain an array of your files.
    // Myself using node.js and multipart handler middleware multer get the data as follows:
    //http://stackoverflow.com/questions/12989442/uploading-multiple-files-using-formdata
    
    //in each change of choosing file in the <input type="file" it will call this func in order to change the file saved in the formData    
    pitchFileChange(event) {
        this.saveFileToFormData('pitchFile', event);
    }
    //in each change of choosing file in the <input type="file" it will call this func in order to change the file saved in the formData    
    questionsFileChange(event) {
        this.saveFileToFormData('questionsFile', event);
    }
    //in each change of choosing file in the <input type="file" it will call this func in order to change the file saved in the formData    
    finderFileChange(event) {
        this.saveFileToFormData('finderFile', event);
    }
    //in each change of choosing file in the <input type="file" it will call this func in order to change the file saved in the formData
    fileChange(event) {
        // console.log(event.srcElement);        
        // var files = event.srcElement.files;
        this.saveFileToFormData('uploadedfile', event);
        //this.projectService.uploadFiles(this.formData);
    }
    /**saves files into the FormData (formdata- key value pair https://developer.mozilla.org/en-US/docs/Web/API/FormData/append) */
    private saveFileToFormData(name, event) {//name - key , event - containing the file from the <input type=file>
        var target = event.target || event.srcElement;//for cross browser - http://stackoverflow.com/questions/5301643/how-can-i-make-event-srcelement-work-in-firefox-and-what-does-it-mean
        var file = target.files[0];
        //appending file into formdata:
        this.formData.append(name, file, file.name);
        console.log('file' + file.name + ' appended to formdata');//DEBUG

    }
     //get a program name and check if it exist in the project.programSuggested (if user chosed this program from combobox)
    isProjectProgramContains(program){
       if(this.project.programSuggested.indexOf(program) > -1){
           return true;
       } 
       return false;
    }
    //when clicking on one of the "צפה בקובץ" button - will download the relevant file
    downloadfile(fieldName){
        this.projectService.downloadFile(fieldName,this.project);
    }
    
    onSubmit(f) {
        console.log('form details:');
        console.log(f);
        console.log('should submit:');
        console.log(this.project); //DEBUG

        //suppose to send HTTP PATCH request to server:
        this.projectService.updateProject(this.project).then(res => console.log(res))
    }
}
