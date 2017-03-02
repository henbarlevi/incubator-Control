/*
Component that wrap 'user-edit' and 'user-list' and enable
to edit existing users and create new ones

 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlPanelService } from '../control-panel.service';

@Component({
    selector: 'users',
    template: `
    <user-edit [user]="editableUser" (save)="save($event)" ></user-edit>
    <user-list [users]="users"
      (remove)="remove($event)" (edit)="edit($event)"></user-list>
  `,//(remove)="remove($event)" - 'remove' event happend when delete btn is click, the eventEmitter of the user-list
    //will raise the event with the user object ($event=user) sending it to the remove method
})
export class UsersComponent {

    users = []; //bind to the users objects that come from the server

    editMode = false;
    editableUser = {}; //used to inject the user from the list that clicked edit into the user-edit Component

    constructor(private controlPanelService: ControlPanelService) { }
    ngOnInit() {
        this.reload();
    }
    //reload the existing users from the server
    reload() {
        this.controlPanelService.getUsers().then(res => this.users = res.users);
    }
    save(user) {
        if (this.editMode === true) {
            this.controlPanelService.updateUser(this.editableUser)//send update request to server
                .then(res => {
                    if (res.ok) {
                        this.editableUser = {};
                        this.editMode = false;
                        this.reload();
                    }
                });
        }
    }
    //called when one of the users in the list clicked on the delete button
    remove(user) { //when one of the users in the list clicked on the delete button it will send http req to delete the user
        this.controlPanelService.deleteUser(user)
        .then(res=>{
            if(res.ok){
                this.reload();
            }
        });
    }
    edit(user) {
        this.editableUser = user// take a new empty object and copy all the props of member object into the empty object and return the result
        this.editMode = true;
    }

}