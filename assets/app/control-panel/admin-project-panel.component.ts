/*this is where the admin can change the project form structure */
/*
component that let change the options of the combo boxes in the project form 
 */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { GlobalVariablesService } from '../shared/global-variables.service'; //service that contain the combobox options and other global vars
import { ComboboxesOptionsService } from '../shared/combobox-options.service'; //service that load the combobox options from server
import { ControlPanelService } from './control-panel.service';
@Component({
    selector: 'admin-users-panel',
    templateUrl: './admin-project-panel.component.html',
    styles: [`
     .optionsDiv{
        display:inline;
    }
  `]

})
export class AdminProjectPanelComponent implements OnInit {

    option = ''; //input of new option entered 
    comboboxName = ''; //name of the combobox chosen to add the option to (selecting from a combobox - the options are the combobox names (source/status/domain))

    sourcesOptions = [];//will contain the source combobox options in order to display/delete them
    statusOptions = [];//will contain the status combobox options in order to display/delete them
    domainOptions = [];//will contain the domain combobox options in order to display/delete them
    constructor(private controlPanelService: ControlPanelService,
        private globalVariablesService: GlobalVariablesService,
        private comboboxesOptionsService: ComboboxesOptionsService) {//inject services

    }
    ngOnInit() {
         this.comboboxesOptionsService.loadOptions().then(() =>{
        //getting all the comboboxes options of the project form from the GlobalVariablesService
        this.statusOptions = this.globalVariablesService.statusOptions;
        this.domainOptions = this.globalVariablesService.domainOptions;
        this.sourcesOptions = this.globalVariablesService.sourcesOptions;
         });
    }
    //sending get request to get options from server in order to refresh the options list
    reload(){ 
            this.ngOnInit(); //reload the comboboxes options from server    
    }
    //sending delete option request to the server
    deleteStatus(option,comboboxName) {
        this.comboboxesOptionsService.deleteOption(option,comboboxName)
        .then(res=>{ //if the delete request succeded - refresh the page
            if(res.ok){
                this.reload();
            }
        })
    }
    //sending add option request to the server    
    addOption(){
        this.comboboxesOptionsService.addOption(this.option,this.comboboxName)
        .then(res=>{
            if(res.ok){ //if the add request succeded - refresh the page
                this.reload();
            }
        });
    }


}