/*component that diplay 
-start date calendar
-end date calendar
=input multi files

usage of this component:
-[(startDate)] to bind to the start date calendar input
-[(endDate)] to bind to the end date calendar input
-(filesChange) to bind to (change) input file event and get files content
-[downloadable]  - bool - determine if to show a 'צפה בקובץ ' button 

-can add title to the component inside the component borders (<date-and-files>titile</date-and-files>)
thx to ng-content : https://www.reddit.com/r/Angular2/comments/48ktjp/what_is_ngcontentngcontent/
-also can add extra content inside ng-content select="div.body"
for example
<date-and-files>
<div class="body">
extra content
</div>
</date-and-files>
*/

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
    selector: 'date-and-files',
    template: `    
    <div>
        <h3><b><ng-content></ng-content></b></h3>
        <div class="panel panel-primary">               
         <ng-content select="div.body"></ng-content>
            <div class="form-group">
                <div class="col-xs-6 col-sm-6  col-md-6">  
                <h5> תאריך סיום   </h5>
                
                <input type="date"  [ngModel]="endDate" (ngModelChange)=" endDateChange.emit($event)"  >  
                </div>   
                <div class="col-xs-6 col-sm-6  col-md-6">  
                <h5> תאריך התחלה   </h5>
                <input type="date"  [ngModel]="startDate" (ngModelChange)=" startDateChange.emit($event)" >
                </div>
               
                           
           </div>        
                <input multiple type="file" (change)="onFilesChange($event)" placeholder="Upload files"
                    accept=".pdf,.doc,.docx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                
                <button *ngIf="downloadable" type="button" (click)="onDownload()" class="btn btn-success btn-md">צפה בקובץ</button>                                       
    
        </div>
    </div>
  `,//dont forget to use  <ng-content> TODO
    styleUrls: ['./date-and-files.component.css']

})

export class DateAndFilesComponent implements OnInit {
    //2 way binding for startDate param
    @Input() startDate;
    @Output() startDateChange = new EventEmitter<string>();
    //2 way binding for endDate param
    @Input() endDate;
    @Output() endDateChange = new EventEmitter<string>();    

    @Output() filesChange = new EventEmitter<any>();//raised each time the files changed with the input files DOM
    
    @Input() downloadable = false; //determine if to show a 'צפה בקובץ ' button 
    @Output() download = new EventEmitter<any>();//raised each time the files changed with the input files DOM    
    ngOnInit() {

    }

    onFilesChange(filesInput){
        //DEBUG
        console.log('the files');
        console.log(filesInput);
        
        this.filesChange.emit(filesInput);
    }
    onDownload(){
        this.download.emit();
    }
}