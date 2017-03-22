//---------------modules---------------//
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { routing } from './app.routing';
//---------------Features---------------//
import { AppComponent } from "./app.component";
//Login:
import {LoginService} from './login/login.service';
import { LoggedInGuard } from './login/logged-in.guard';
import { LoginFormComponent} from './login/login-form.component';
//dashboard:
import { DashboardComponent} from './dashboard/dashboard.component';
import { DashboardService} from './dashboard/dashboard.service';
//home page:
import {HomeComponent} from './Home/home.component';
//about us:
import {AboutUsComponent } from './about-us/about-us.component';
//inbox:
import {InboxComponent } from './inbox/inbox.component';

//project:
    //project-list:
    import { ProjectListComponent} from './project/project-list/project-list.component';
    //project-edit:
    import { ProjectEditComponent} from './project/project-edit/project-edit.component';
    //project-search
    import { ProjectSearchPageComponent} from './project/project-search/project-search-page.component';   
    import {SearchSelectComponent } from './project/project-search/search-select.component';
    //project-form:
    import { ProjectFormComponent} from './project/project-form/project-form.component';
        //project-form shared:
        import {CrewComponent} from './project/project-form/shared/crew/crew.component';
        import {MemberEditComponent } from './project/project-form/shared/crew/member-edit.component';   
        import {MemberListComponent } from './project/project-form/shared/crew/member-list.component';
        import {SourceSelectComponent} from './project/project-form/shared/source-select.component';
        import {StatusSelectComponent} from './project/project-form/shared/status-select.component';
        import {DomainSelectComponent} from './project/project-form/shared/domain-multi-select.component';
        import {ProgramSelectComponent } from './project/project-form/shared/program-multi-select.component';            
            //project-form shard/events-reerence/:
            import {EventsComponent } from './project/project-form/shared/events-reference/events.component';
            import {EventEditComponent } from './project/project-form/shared/events-reference/event-edit/event-edit.component';
            import {EventListComponent } from './project/project-form/shared/events-reference/event-list.component';
            import {EventStatusSelectComponent } from './project/project-form/shared/events-reference/event-select.component';
            //project-form shared/bussines-development/:
            import { BusinessesComponent,BusinessEditComponent,BusinessListComponent,BusinessStatusSelectComponent} from './project/project-form/shared/business-development';
            //project-form shard/seed-aid:
            import {SeedAidComponent, SeedEditComponent, SeedListComponent,SeedStatusSelectComponent,SeedResultSelectComponent} from './project/project-form/shared/seed-aid';
    //project shared:
    import { ProjectService} from './project/shared/project.service';
//control-panel:
import{AdminUsersPanelComponent} from './control-panel/admin-users-panel.component';
import{AdminProjectPanelComponent} from './control-panel/admin-project-panel.component';
import {ControlPanelService } from './control-panel/control-panel.service';
    //control-panel shared:
    import { UsersComponent} from './control-panel/shared/users.component';
    import { UserEditComponent} from './control-panel/shared/user-edit.component';
    import {UserListComponent } from './control-panel/shared/user-list.component';
//---------SHARED:
import {GlobalVariablesService} from './shared/global-variables.service';
import {ComboboxesOptionsService } from './shared/combobox-options.service';
import {NavBarComponent} from './shared/navbar/nav-bar.component';
import{ AdminNavBarComponent}from './shared/navbar/admin-nav-bar.component';
import{ EditorNavBarComponent}from './shared/navbar/editor-nav-bar.component';
import{ WatcherNavBarComponent}from './shared/navbar/watcher-nav-bar.component';


import { Ng2CompleterModule } from "ng2-completer";
import { CustomData} from './project/project-search/auto-complete.service';
@NgModule({
    //modules
    imports: [BrowserModule, FormsModule , HttpModule,routing,Ng2CompleterModule],
    //Components and pipes
    declarations: [ 
        AppComponent,
        //login
        LoginFormComponent,
        //dashboard
        DashboardComponent, 
        //nested dashboard Components
        HomeComponent,
        AboutUsComponent,
        InboxComponent,
        //project
                //project-list:
                ProjectListComponent,
                //project-edit:
                ProjectEditComponent,
                //project-form:
                ProjectFormComponent,
                    //project-form shared:
                        //crew:    
                        MemberEditComponent,
                        MemberListComponent,
                        CrewComponent,
                        //events-reference:
                        EventsComponent,
                        EventEditComponent,
                        EventListComponent,
                        EventStatusSelectComponent,
                        //business-development:
                        BusinessesComponent,
                        BusinessEditComponent,
                        BusinessListComponent,
                        BusinessStatusSelectComponent,
                        //seed-aid:
                        SeedAidComponent,
                        SeedStatusSelectComponent,
                        SeedResultSelectComponent,
                        SeedEditComponent,
                        SeedListComponent,
                 SourceSelectComponent,
                 StatusSelectComponent,
                 DomainSelectComponent,
                 ProgramSelectComponent,
                //project-search:
                ProjectSearchPageComponent,
                SearchSelectComponent,
                
        //control-panel:
        AdminUsersPanelComponent,
        AdminProjectPanelComponent,
                //control-panel shared:
                UsersComponent,
                UserEditComponent,
                UserListComponent,
        //shared
        NavBarComponent,
        AdminNavBarComponent,
        EditorNavBarComponent,
        WatcherNavBarComponent
    ],
    //Services and Guards
    providers: [
         GlobalVariablesService,
         ComboboxesOptionsService,
         LoginService,
         LoggedInGuard,
         DashboardService,
         ProjectService, 
         ControlPanelService,
         CustomData//TEST 
         
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}