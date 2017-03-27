

//the Incubation Program Module

import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

//components:
// import {AdminNavBarComponent} from './navbar/admin-nav-bar.component';
// import {EditorNavBarComponent} from './navbar/editor-nav-bar.component';
// import {WatcherNavBarComponent} from './navbar/watcher-nav-bar.component';
// import {NavBarComponent} from './navbar/nav-bar.component';

import {ResultButtonComponent} from './result-button.component';

// import {ComboboxesOptionsService} from './combobox-options.service';
// import {GlobalVariablesService} from './global-variables.service';


@NgModule({
  imports: [
      BrowserModule,
      FormsModule
  ],
  //Components and pipes
  declarations: [
    // AdminNavBarComponent,
    // EditorNavBarComponent,
    // WatcherNavBarComponent,
    // NavBarComponent,
    ResultButtonComponent,
    
  ],
  //Services and Guards
  providers: [
    // ComboboxesOptionsService,
    // GlobalVariablesService
  ],
  //in order to be shared and use by other modules (by AppModule for example)
    exports: [
        // AdminNavBarComponent,
        // EditorNavBarComponent,
        // WatcherNavBarComponent,
        // NavBarComponent,
        ResultButtonComponent,
  ]

})
export class SharedModule { }
