import { RouterModule } from '@angular/router';
//----------Components-------------:
import { LoginFormComponent } from './login/login-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//dashboard nested views:
import {HomeComponent} from './Home/home.component';
import {AboutUsComponent } from './about-us/about-us.component';
import {InboxComponent } from './inbox/inbox.component';
import {ProjectSearchPageComponent}from './project/project-search/project-search-page.component'
import {ProjectEditComponent } from './project/project-edit/project-edit.component';
import{AdminUsersPanelComponent} from './control-panel/admin-users-panel.component';
import{AdminProjectPanelComponent} from './control-panel/admin-project-panel.component';
//project:
import { ProjectFormComponent } from './project/project-form/project-form.component';
//-----------GUARDS---------------:
import { LoggedInGuard } from './login/logged-in.guard'; //import guard

export const routing = RouterModule.forRoot([
  {
    path: 'login',
    component: LoginFormComponent
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
  ,
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoggedInGuard], //the user can go to this route only if the LoggedInGuard allow it
       children: [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: HomeComponent},
            {path: 'about-us', component: AboutUsComponent},
            {path: 'new-project', component: ProjectFormComponent},
            {path: 'inbox', component: InboxComponent},                             
            {path: 'project-search-page', component:ProjectSearchPageComponent},
            {path: 'project-edit/:projectId', component:ProjectEditComponent},                 
            {path:  'admin-users-panel', component:AdminUsersPanelComponent},
            {path:  'admin-project-panel', component:AdminProjectPanelComponent}
            
        ]
  }
  
  
]);