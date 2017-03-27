/*
Component that wrap all components that related to the incubation program fields

 */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
    selector: 'incubation',
    template: `
    <date-and-files [(startDate)]="incubation.verificationAnalysis.startDate" [(endDate)]="incubation.verificationAnalysis.endDate">verification Analysis</date-and-files>
    <volunteers></volunteers>
    <date-and-files [(startDate)]="incubation.businessProgram.startDate" [(endDate)]="incubation.businessProgram.endDate">בניית תוכנית עיסקית</date-and-files>
    <date-and-files [(startDate)]="incubation.marketingStrategy.startDate" [(endDate)]="incubation.marketingStrategy.endDate">אסטרטגיית שווק</date-and-files>
    <date-and-files [(startDate)]="incubation.productCharacterization.startDate" [(endDate)]="incubation.productCharacterization.endDate">איפיון מוצר</date-and-files>
    <date-and-files [(startDate)]="incubation.productDesign.startDate" [(endDate)]="incubation.productDesign.endDate">עיצוב מוצר</date-and-files>
    <date-and-files [(startDate)]="incubation.productDevelopment.startDate" [(endDate)]="incubation.productDevelopment.endDate">פיתוח מוצר</date-and-files>
    <date-and-files [(startDate)]="incubation.poc.startDate" [(endDate)]="incubation.poc.endDate">
    Poc
        <div class="body form-group">
        <label for="ex2">שם הלקוח</label>
        <input class="form-control" id="ex2" type="text">
        </div>
        <div class="body form-group">
        <label for="ex2">תוצאת הפיילוט</label>
        <result-button></result-button>
        </div>
    </date-and-files>
    
    <button type = "button" (click)="printIncubation()">print incubation object<button>
  `,
})
export class IncubationComponent implements OnInit {

    @Input() incubation = {};
    // @Output() eventsChange = new EventEmitter<Object[]>(); //event bind when
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



}