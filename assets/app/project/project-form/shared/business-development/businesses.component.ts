/*
Component that wrap 'business-edit' and 'business-list' and enable
to inject businesses object into the businesses prop in order to display
the businesses details, delete businesses and edit them (using 2 way binding)

 */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'bussiness-development',
    template: `
    <business-edit [business]="editableBusiness" (save)="save($event)" ></business-edit>
    <business-list [businesses]="businesses"
      (remove)="remove($event)" (edit)="edit($event)"></business-list>
  `,//(remove)="remove($event)" - 'remove' business happend when delete btn is click, the eventEmitter of the business-list
    //will raise the business with the business object ($event=business obj) sending it to the remove method
})
export class BusinessesComponent {

    @Input() businesses = []; //the members array object
    // @Output() eventsChange = new EventEmitter<Object[]>(); //event bind when

    editMode = false;
    editableBusiness = {}; //used to inject the business from the list that clicked edit into the business-edit Component -Or- to create new business
    save(business) {
        if (this.editMode === true) {
            this.editMode = false;
        } else {

            this.businesses.push(business);
        }
        this.editableBusiness = {};
    }

    remove(business) { //when one of the businesses clicked on the delete button it will be removed from the array
        let length = this.businesses.length;
        for (var i = 0; i < length; i++) {
            if (business === this.businesses[i]) {
                this.businesses.splice(i, 1);
            }
        }
    }
    edit(business) {
        console.log('business.component got an edit business with the this object');
        console.log(business);
        this.editableBusiness = business; //assgin the clicked "edit" business from the business-list into the business-edit component
        this.editMode = true;//this is how we now if to create a new business or to edit existing one
    }
    // onEventsChange() { //buble  the events to the outside enivorment when they change
    //     this.eventsChange.emit(this.businesses);//event bind the members
    // }
}