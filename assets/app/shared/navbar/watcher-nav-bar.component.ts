
/*
navigation bar that display in the watcher dashboard
by wraping the nav-bar Component and injecting the relevant route links
 */
import { Component, Input } from '@angular/core';


@Component({
    selector: 'watcher-nav-bar',
    template: `
        <nav-bar [navLinks]="navLinks"></nav-bar>
    `
})
export class WatcherNavBarComponent {
    navLinks = [
        { content: "המיזם שלי", routerLink: "/login" },
        { content: "מי אנחנו", routerLink: "about-us" },
        { content: "Inbox", routerLink: "/login" }        
    ]; //one way binding array object that declare the navigation bar links

    constructor() {
    }
}
