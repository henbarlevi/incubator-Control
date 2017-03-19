/*
Component that wrap 'seed-edit' and 'seed-list' and enable
to inject seeds object into the seeds prop in order to display
the seeds details, delete seeds and edit them (using 2 way binding)

 */
import { Component, EventEmitter, Input, Output ,OnInit} from '@angular/core';

@Component({
    selector: 'seed-aid',
    template: `
    <seed-edit [seed]="editableSeed" (save)="save($event)" ></seed-edit>
    <seed-list [seeds]="seeds"
      (remove)="remove($event)" (edit)="edit($event)"></seed-list>
  `,//(remove)="remove($event)" - 'remove' seed happend when delete btn is click, the eventEmitter of the seed-list
    //will raise the seed with the seed object ($event=seed obj) sending it to the remove method
})
export class SeedAidComponent implements OnInit {

    @Input() seeds = []; //the members array object
    // @Output() eventsChange = new EventEmitter<Object[]>(); //event bind when
    ngOnInit(){
        console.log(this.seeds);
    }
    editMode = false;
    editableSeed = {}; //used to inject the Seed from the list that clicked edit into the Seed-edit Component -Or- to create new Seed
    save(seed) {
        if (this.editMode === true) {
            this.editMode = false;
        } else {

            this.seeds.push(seed);
            console.log(this.seeds);
        }
        this.editableSeed = {};
    }

    remove(seed) { //when one of the seeds clicked on the delete button it will be removed from the array
        let length = this.seeds.length;
        for (var i = 0; i < length; i++) {
            if (seed === this.seeds[i]) {
                this.seeds.splice(i, 1);
            }
        }
    }
    edit(seed) {
        console.log(seed);
        this.editableSeed= seed; //assgin the clicked "edit" seed from the seed-list into the seed-edit component
        this.editMode = true;//this is how we now if to create a new seed or to edit existing one
    }
 
}