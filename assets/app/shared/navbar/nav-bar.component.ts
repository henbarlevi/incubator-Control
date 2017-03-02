
/*abstract Component that display navigation bar 
the navigation bar links and content depends on the 
*navLinks property.
navLinks is a one way binding object array
each object in the array have 2 properties - content and routerLink
content - the link content display button
routerLink - the route link
*navElements-also an array ch object in the array have 2 properties - content and routerLink
the content will be inject as an innerHtml to the <a> elment in order to
inject links with symbols like the "ניהול יוזרים" link

this Component suppose to be wraped by 
admin-navbar ,editor-navbar and other roles Components, they reuse this abstract 
navbar Component so that they only need to insert values to the navLinks property in order
to create a navigation bar for the specific role (admin/editor etc.)


this abstract navbar have default navigation links which are currently
"Gold Ventures Incubator" - navigate to 'dashboard/home'
"התנתק"  - use login service to send logout http requset and navigate to the 'login' route
 */
import { Component, Input } from '@angular/core';
import { LoginService} from '../../login/login.service';
import {Router} from '@angular/router';
@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
    @Input() navLinks = []; //one way binding array object that declare the navigation bar simple links
    @Input() navElements= []; //one way binding array object that declare the navigation bar elements links
    constructor(private loginService:LoginService,
                private router:Router) {
        this.navLinks.push({ content: 'default', routerLink: '/login' }); //DEBUG
    }

    //happens when clicking on the logout <a>, will logout and navigate to the 'login' route
    logout(){
       //send logout http req:
       this.loginService.logout()
       .then(()=>this.router.navigate(['/login']));

    
    }

}
