/*component that diplay 
-start date calendar
-end date calendar
=input multi files
*/

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
    selector: 'date-and-files',
    template: `    
    <div>
        <div class="panel panel-primary">               
            <div class="form-group">
                <div class="col-xs-6 col-sm-6  col-md-6">  
                <h5> תאריך התחלה   </h5>
                <input type="date"  [ngModel]="startDate" (ngModelChange)=" startDateChange.emit($event)" >
                </div>
                 <div class="col-xs-6 col-sm-6  col-md-6">  
                <h5> תאריך סיום   </h5>
                
                <input type="date"  [(ngModel)]="endDate"   >  
                </div>              
                <input multiple type="file" (change)="onFilesChange($event)" placeholder="Upload files"
                    accept=".pdf,.doc,.docx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
           </div>        
        </div>
    </div>
  `,//dont forget to use  <ng-content> TODO
    styleUrls: []

})

export class DateAndFilesComponent implements OnInit {
    @Input() startDate;
    @Output() startDateChange = new EventEmitter<string>();

    @Input() endDate;
    //     get userDetails() {
    //     debugger;
    //     if(!localStorage.getItem('userDetails')){ //if userDetails doesnt exist in storage
    //         return undefined;
    //     }
    //     return JSON.parse(localStorage.getItem('userDetails'));;
    // }
    // set userDetails(value) {
    //     debugger;
    //     if(!value){//if value is undefiend/null
    //         localStorage.removeItem('userDetails'); // remove user details from storage
    //     }else{

    //     localStorage.setItem('userDetails',JSON.stringify(value));
    //     }
    // } //contain user details (without password)
    @Output() filesChange = new EventEmitter<any>();
    ngOnInit() {

    }

    onFilesChange(filesInput){
        this.filesChange.emit(filesInput);
    }
}