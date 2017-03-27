

//the Incubation Program Module

import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

//volunteers
import {VolunteersComponent,VolunteerEditComponent, VolunteerStatusSelectComponent, VolunteerListComponent} from './volunteers'
//date-and-fies:
import { DateAndFilesComponent} from './date-and-files/date-and-files.component';
//incubation:
import { IncubationComponent} from './incubation.component';
//common module
import {SharedModule } from '../../../../shared/shared.module';
@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      SharedModule//common components and services (pipes etc)..
  ],
  //Components and pipes
  declarations: [
    //volunteers:
    VolunteersComponent,
    VolunteerEditComponent,
    VolunteerStatusSelectComponent,
    VolunteerListComponent,
    //date and files
    DateAndFilesComponent,
    //incubation
    IncubationComponent
  ],
  //Services and Guards
  providers: [
    
  ],
  //in order to be shared and use by other modules (by AppModule for example)
    exports: [
        DateAndFilesComponent,
        IncubationComponent
  ]

})
export class IncubationModule { }
