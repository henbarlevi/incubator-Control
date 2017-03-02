
/*
navigation bar that display in the editor dashboard
by wraping the nav-bar Component and injecting the relevant route links
 */
import { Component, Input } from '@angular/core';


@Component({
    selector: 'editor-nav-bar',
    template: `
        <nav-bar [navLinks]="navLinks" [navElements]="navElements"></nav-bar>
    `
})
export class EditorNavBarComponent {
    navLinks = [
        { content: "מיזמים", routerLink: "project-search-page" },
        { content: "הוסף מיזם", routerLink: "new-project" },
        { content: "מי אנחנו", routerLink: "about-us" },
        { content: "Inbox", routerLink: "inbox" }
        
    ]; //one way binding array object that declare the navigation bar links
    navElements=[
       {content:"<span class='glyphicon glyphicon-user'></span>ניהול יוזרים" ,routerLink: "/login"  } ,
    ]
    constructor() {
    }
}
