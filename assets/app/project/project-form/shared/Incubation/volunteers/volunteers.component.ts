/*
Component that wrap 'volunteer-edit' and 'volunteer-list' and enable
to inject volunteers object into the volunteers prop in order to display
the volunteers details, delete volunteers and edit them (using 2 way binding)

 */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'volunteers',
    template: `
      <h3><b> צוות מתנדבים </b></h3>
    <volunteer-edit [volunteer]="editableVolunteer" (save)="save($event)" ></volunteer-edit>
    <volunteer-list [volunteers]="volunteers"
      (remove)="remove($event)" (edit)="edit($event)"></volunteer-list>
  `,//(remove)="remove($event)" - 'remove' event happend when delete btn is click, the eventEmitter of the volunteer-list
    //will raise the event with the volunteer object ($event=volunteer) sending it to the remove method
    styles:[`
h3{
    text-align:center;
}

`]
})
export class VolunteersComponent {

    @Input() volunteers = []; //the volunteers array object
    @Output() volunteersChange = new EventEmitter<Object[]>(); //event bind when

    editMode = false;
    editableVolunteer = {}; //used to inject the volunteer from the list that clicked edit into the volunteer-edit Component
    save(volunteer) {
        console.log('saving');
        console.log(volunteer);
        if(this.editMode === true){
            
            this.editMode = false;
        }else{

        this.volunteers.push(volunteer);
        console.log('after save');
        console.log(this.volunteers);
        }
        this.editableVolunteer ={};
    }

    remove(volunteer) { //when one of the volunteers clicked on the delete button it will be removed from the array
        let length = this.volunteers.length;
        for (var i = 0; i < length; i++) {
            if (volunteer === this.volunteers[i]) {
                this.volunteers.splice(i, 1);
            }
        }
    }
    edit(volunteer) {
        this.editableVolunteer =  volunteer// take a new empty object and copy all the props of volunteer object into the empty object and return the result
        this.editMode = true;
    }
    onVolunteersChange() { //buble  the volunteers to the outside enivorment when they change
        this.volunteersChange.emit(this.volunteers);//event bind the members
    }
}