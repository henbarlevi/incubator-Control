
/*
navigation bar that display in the admin dashboard
by wraping the nav-bar Component and injecting the relevant route links
 */
import { Component, Input } from '@angular/core';


@Component({
    selector: 'admin-nav-bar',
    template: `
        <nav-bar [navLinks]="navLinks" [navElements]="navElements"></nav-bar>
    `
})
export class AdminNavBarComponent {
    navLinks = [
        { content: "מיזמים", routerLink: "project-search-page" },
        { content: "הוסף מיזם", routerLink: "new-project" },
        { content: "מי אנחנו", routerLink: "about-us" },
        { content: "Inbox", routerLink: "inbox" },              
    ]; //one way binding array object that declare the navigation bar links
    navElements=[
       {content:"<span class='glyphicon glyphicon-user'></span>ניהול יוזרים" ,routerLink: "admin-users-panel"  } ,
       {content:"<span class='glyphicon glyphicon-pencil'></span> form עריכת" ,routerLink:"admin-project-panel"}
    ]
    constructor() {
    }
}
