/*
Component that wrap all components that related to the incubation program fields

 */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'incubation',
    template: `
    <volunteers></volunteers>
  `,
})
export class IncubationComponent {

     @Input() incubation 
     // @Output() eventsChange = new EventEmitter<Object[]>(); //event bind when

    editMode = false;
 

 
}