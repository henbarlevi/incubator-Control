
/*Component that display the relevant dashboard depend on the
role of the user, 
role = 'admin' - will display the AdminDashboard component
role = 'editor' - will display the EditorDashboard component
role = 'watcher' - will display the WatcherDashboard component
 */
import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service'; //service that send http requests for the DashboardComponent
import { ComboboxesOptionsService } from '../shared/combobox-options.service';
@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',//nested <router-outlet> info: http://lishman.io/angular-2-router
    styleUrls:['./dashboard.component.css']
})
export class DashboardComponent {

    private role = 'watcher';

    constructor(private dashboardService: DashboardService,
        private comboboxesOptionsService: ComboboxesOptionsService) {
        this.DisplayRelevantDashboard();
        this.loadComboboxesOptions();
        console.log('dashboard ctor called');//DEBUG
    }
    isRoleEquals(role) {
        if (this.role === role) {
            return true;
        }
        return false;
    }
    //load options that comboboxes in project form contain and save them in the GlobalVariablesService
    loadComboboxesOptions() {
        this.comboboxesOptionsService.loadOptions();
    }
    //check the user authorization and switch to true the relevant property (isAdmin/isEditor/isWatcher)
    DisplayRelevantDashboard() {
        this.dashboardService.checkUserRole().then(res => this.role = res.role);

    }
}