/*component that diplay 
-start date calendar
-end date calendar
=input multi files

usage of this component:
-[(startDate)] to bind to the start date calendar input
-[(endDate)] to bind to the end date calendar input
-(filesChange) to bind to (change) input file event and get files content
*/

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
    selector: 'date-and-files',
    template: `    
    <div>
        <h3><b><ng-content></ng-content></b></h3>
        <div class="panel panel-primary">               
            <div class="form-group">
                <div class="col-xs-6 col-sm-6  col-md-6">  
                <h5> תאריך התחלה   </h5>
                <input type="date"  [ngModel]="startDate" (ngModelChange)=" startDateChange.emit($event)" >
                </div>
                 <div class="col-xs-6 col-sm-6  col-md-6">  
                <h5> תאריך סיום   </h5>
                
                <input type="date"  [ngModel]="endDate" (ngModelChange)=" endDateChange.emit($event)"  >  
                </div>              
                <input multiple type="file" (change)="onFilesChange($event)" placeholder="Upload files"
                    accept=".pdf,.doc,.docx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
           </div>        
        </div>
    </div>
  `,//dont forget to use  <ng-content> TODO
    styleUrls: ['./date-and-files.component.css']

})

export class DateAndFilesComponent implements OnInit {
    @Input() startDate;
    @Output() startDateChange = new EventEmitter<string>();

    @Input() endDate;
    @Output() endDateChange = new EventEmitter<string>();    

    @Output() filesChange = new EventEmitter<any>();
    ngOnInit() {

    }

    onFilesChange(filesInput){
        this.filesChange.emit(filesInput);
    }
}