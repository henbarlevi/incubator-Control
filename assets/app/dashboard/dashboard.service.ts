import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { GlobalVariablesService } from '../shared/global-variables.service';

@Injectable() //in order to inject http service - no need to do this when using @Component because @Component already implement the injection
export class DashboardService {

  baseUrl; //the root url
  role;//user role (admin/editor/wathcer)

  constructor(private http: Http,
    private globalvarsService: GlobalVariablesService) { //inject http service, globalVariablesService and ComboboxesOptionsService
    this.baseUrl = this.globalvarsService.baseUrl; //assign the base url
    this.role = this.globalvarsService.userDetails.role; //assign the client user that currently using the service role  
  }

  doSomthing() { //will return a login response not imidetlly (async)  
    return this.http.get(`${this.baseUrl}/watcher`).toPromise() //'Get Request to 'localhost:8080/quote.json'
      .then(response => response.json());

  }
  checkmiddle() {//DEBUG
    return this.http.get(`${this.baseUrl}/test`).toPromise() //'Get Request to 'localhost:8080/quote.json'
      .then(response => response.json());
  }
  
  checkUserRole() {
    return this.http.get(`${this.baseUrl}/role`).toPromise() //'Get Request to 'localhost:8080/quote.json'
      .then(response => response.json());
  }
}
