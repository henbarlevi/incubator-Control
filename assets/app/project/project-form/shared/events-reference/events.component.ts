/*
Component that wrap 'event-edit' and 'event-list' and enable
to inject events object into the events prop in order to display
the events details, delete events and edit them (using 2 way binding)

 */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'events-reference',
    template: `
    <event-edit [event]="editableEvent" (save)="save($event)" ></event-edit>
    <event-list [events]="events"
      (remove)="remove($event)" (edit)="edit($event)"></event-list>
  `,//(remove)="remove($event)" - 'remove' event happend when delete btn is click, the eventEmitter of the event-list
    //will raise the event with the event object ($event=event obj) sending it to the remove method
})
export class EventsComponent {

    @Input() events = []; //the members array object
    @Output() eventsChange = new EventEmitter<Object[]>(); //event bind when

    editMode = false;
    editableEvent = {}; //used to inject the event from the list that clicked edit into the event-edit Component -Or- to create new event
    save(event) {
        console.log('pressed on save in the event-edit.component');
        if (this.editMode === true) {
            this.editMode = false;
        } else {

            this.events.push(event);
        }
        this.editableEvent = {};
    }

    remove(event) { //when one of the events clicked on the delete button it will be removed from the array
        let length = this.events.length;
        for (var i = 0; i < length; i++) {
            if (event === this.events[i]) {
                this.events.splice(i, 1);
            }
        }
    }
    edit(event) {
        console.log('event.component got an edit event with the this object');
        console.log(event);
        this.editableEvent = event; //assgin the clicked "edit" event from the event-list into the event-edit component
        this.editMode = true;//this is how we now if to create a new event or to edit existing one
    }
    onEventsChange() { //buble  the events to the outside enivorment when they change
        this.eventsChange.emit(this.events);
    }
}