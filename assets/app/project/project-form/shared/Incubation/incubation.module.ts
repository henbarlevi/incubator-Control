

//the Incubation Program Module

import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

//volunteers
import {VolunteersComponent,VolunteerEditComponent, VolunteerStatusSelectComponent, VolunteerListComponent} from './volunteers'
//date-and-fies:
import { DateAndFilesComponent} from './date-and-files/date-and-files.component';

@NgModule({
  imports: [
      BrowserModule,
      FormsModule
  ],
  //Components and pipes
  declarations: [
    DateAndFilesComponent
  ],
  //Services and Guards
  providers: [
    
  ],
  //in order to be shared and use by other modules (by AppModule for example)
    exports: [
        DateAndFilesComponent
  ]

})
export class IncubationModule { }
