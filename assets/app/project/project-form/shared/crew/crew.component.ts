/*
Component that wrap 'member-edit' and 'member-list' and enable
to inject members object into the members prop in order to display
the members details, delete members and edit them (using 2 way binding)

 */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'crew',
    template: `
     <h3><b> צוות ראשי </b></h3>
    <member-edit [member]="editableMember" (save)="save($event)" ></member-edit>
    <member-list [members]="members"
      (remove)="remove($event)" (edit)="edit($event)"></member-list>
  `,//(remove)="remove($event)" - 'remove' event happend when delete btn is click, the eventEmitter of the member-list
    //will raise the event with the member object ($event=member) sending it to the remove method
styles:[`
h3{
    text-align:center;
}

`]
})
export class CrewComponent {

    @Input() members = []; //the members array object
    @Output() membersChange = new EventEmitter<Object[]>(); //event bind when

    editMode = false;
    editableMember = {}; //used to inject the member from the list that clicked edit into the member-edit Component
    save(member) {
        console.log('saving');
        console.log(member);
        if(this.editMode === true){
            
            this.editMode = false;
        }else{

        this.members.push(member);
        console.log('after save');
        console.log(this.members);
        }
        this.editableMember ={};
    }

    remove(member) { //when one of the members clicked on the delete button it will be removed from the array
        let length = this.members.length;
        for (var i = 0; i < length; i++) {
            if (member === this.members[i]) {
                this.members.splice(i, 1);
            }
        }
    }
    edit(member) {
        this.editableMember =  member// take a new empty object and copy all the props of member object into the empty object and return the result
        this.editMode = true;
    }
    onMembersChange() { //buble  the members to the outside enivorment when they change
        this.membersChange.emit(this.members);//event bind the members
    }
}