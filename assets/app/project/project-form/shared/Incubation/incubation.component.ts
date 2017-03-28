/*
Component that wrap all components that related to the incubation program fields

 */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
    selector: 'incubation',
    template: `
    <date-and-files [(startDate)]="incubation.verificationAnalysis.startDate" [(endDate)]="incubation.verificationAnalysis.endDate" (filesChange)="onFilesChange('verificationAnalysis',$event)">verification Analysis</date-and-files>
    <volunteers [volunteers]="incubation.volunteers" ></volunteers>
    <date-and-files [(startDate)]="incubation.businessProgram.startDate" [(endDate)]="incubation.businessProgram.endDate"(filesChange)="onFilesChange('businessProgram',$event)">בניית תוכנית עיסקית</date-and-files>
    <date-and-files [(startDate)]="incubation.marketingStrategy.startDate" [(endDate)]="incubation.marketingStrategy.endDate" (filesChange)="onFilesChange('marketingStrategy',$event)">אסטרטגיית שווק</date-and-files>
    <date-and-files [(startDate)]="incubation.productCharacterization.startDate" [(endDate)]="incubation.productCharacterization.endDate" (filesChange)="onFilesChange('productCharacterization',$event)">איפיון מוצר</date-and-files>
    <date-and-files [(startDate)]="incubation.productDesign.startDate" [(endDate)]="incubation.productDesign.endDate" (filesChange)="onFilesChange('productDesign',$event)">עיצוב מוצר</date-and-files>
    <date-and-files [(startDate)]="incubation.productDevelopment.startDate" [(endDate)]="incubation.productDevelopment.endDate" (filesChange)="onFilesChange('productDevelopment',$event)">פיתוח מוצר</date-and-files>
    <date-and-files [(startDate)]="incubation.poc.startDate" [(endDate)]="incubation.poc.endDate" (filesChange)="onFilesChange('poc',$event)">
    Poc
        <div class="body form-group">
        <label for="ex2">שם הלקוח</label>
        <input [(ngModel)]="incubation.poc.customerName" class="form-control" id="ex2" type="text">
        </div>
        <div class="body form-group">
        <label for="ex2">תוצאת הפיילוט</label>
        <result-button [(selected)]="incubation.poc.result"></result-button>
        </div>
    </date-and-files>
    <date-and-files [(startDate)]="incubation.marketing.startDate" [(endDate)]="incubation.marketing.endDate" (filesChange)="onFilesChange('marketing',$event)">
      שיווק  
        <div class="body form-group">
        <label for="ex2">שם הקמפיין</label>
        <input [(ngModel)]="incubation.marketing.campaignName" class="form-control"  type="text">
        </div>
        <div class="body form-group">
        <label for="ex2">תוצאת הפיילוט</label>
        <result-button [(selected)]="incubation.marketing.pilotResult"></result-button>
        </div>
        <div class="body form-group">
        <label for="ex2">כמות יוזרים</label>
        <input [(ngModel)]="incubation.marketing.usersAmount" class="form-control"  type="number">
        </div>
        <div class="body form-group">
        <label for="ex2">עלות פר יוזר</label>
        <input [(ngModel)]="incubation.marketing.pricePerUser"  class="form-control"  type="number">
        </div>
        
    </date-and-files>
    <button type = "button" (click)="printIncubation()">שמור נתוני אינקובציה<button>
  `,
})
export class IncubationComponent implements OnInit {

    @Input() incubation = {};
    @Output() incubationChange = new EventEmitter<any>();

    @Output() filesChange = new EventEmitter<any>();

    ngOnInit() {
        this.incubation = {
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

    printIncubation(){
        console.log( this.incubation);
    }
    // ngDoCheck(){
    //     console.log('incubation changed');
    //     this.incubationChange.emit(this.incubation);
    // }
    onFilesChange(name,files){
        console.log(files);
        console.log('emit files from incubaton to parent');
        this.filesChange.emit({name:name,files:files});
    }


}