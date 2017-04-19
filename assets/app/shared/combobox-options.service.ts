/* service that send http request in order to get the comboxes options that 
comboboxes in project form contain,
- using this service also to change the options by the admin*/

import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { GlobalVariablesService } from '../shared/global-variables.service';


@Injectable() //in order to inject http service - no need to do this when using @Component because @Component already implement the injection
export class ComboboxesOptionsService {

    baseUrl; //the root url
    role;//user role (admin/editor/wathcer)

    errorHandler = error => console.error('Comboboxes Options Service error', error);


    constructor(private http: Http,
        private globalvarsService: GlobalVariablesService) {//inject http service and globalVariablesService
        this.baseUrl = this.globalvarsService.baseUrl; //assign the base url
        this.role =()=>{return  this.globalvarsService.userDetails.role}; //assign the client user that currently using the service role
    }
    //HTTP 'DELETE' request - deleting option from the comboboxes of the project form (source/status/domain)
    deleteOption(option, comboboxName)  : Promise<any> {
        //setting name as a queryString parameter:
        let params: URLSearchParams = new URLSearchParams();
        params.set('option', option);
        return this.http.delete(`${this.baseUrl}/${this.role()}/comboboxes-options/${comboboxName}`, { search: params }).toPromise()
            .catch(this.errorHandler);
    }
    //HTTP 'POST' request - adding new option for one of the comboboxes of the project form (source/status/domain):
    addOption(option, comboboxName)  : Promise<any> {
        console.log(option);
        console.log(comboboxName);

        const json = JSON.stringify({ option: option }); //convert option to json
        console.log(json);//DEBUG
        const headers = new Headers({ 'content-Type': 'application/json' });
        return this.http.post(`${this.baseUrl}/${this.role()}/comboboxes-options/${comboboxName}`, json, { headers: headers }).toPromise()
            .catch(this.errorHandler);

    }
    //HTTP 'GET' request - get the oomboxes options that comboboxes in project form contain
    loadOptions()   : Promise<any>{
        return this.http.get(`${this.baseUrl}/${this.role()}/comboboxes-options`).toPromise() //'Get Request to 'localhost:8080/quote.json'
            .then(response => response.json())
            .then(response => this.saveOptions(response))//save options to the globalVariablesService
            .catch(this.errorHandler);
    }

    //save the options of the comboboxes loaded from the server into the globalVariablesService
    private saveOptions(options)  {
        //convert the response that contains the options into string arrays:
        //Array.prototype.map - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        let domainOptions = options.DomainOptions.map(function (opObj) {
            return opObj.option;
        })
        let sourcesOptions = options.SourcesOptions.map(function (opObj) {
            return opObj.option;
        })
        let statusOptions = options.StatusOptions.map(function (opObj) {
            return opObj.option;
        })
        //save the options into the GlobalVariablesService
        this.globalvarsService.statusOptions = statusOptions;
        this.globalvarsService.sourcesOptions = sourcesOptions;
        this.globalvarsService.domainOptions = domainOptions;
        
    }

}