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
            <div class="input-group">
                <input type="date"  [(ngModel)]="startDate" >
                <input type="date"  [(ngModel)]="endDate" >                
                <input multi type="file" (change)="onFilesChange($event)" placeholder="Upload files"
                    accept=".pdf,.doc,.docx">
           </div>        
        </div>
    </div>
  `,
    styleUrls: []

})

export class DateAndFilesComponent implements OnInit {
    @Input() startDate;
    @Input() endDate;
    
    @Output() filesChange = new EventEmitter<any>();
    ngOnInit() {

    }

    onFilesChange(filesInput){
        this.filesChange.emit(filesInput);
    }
}