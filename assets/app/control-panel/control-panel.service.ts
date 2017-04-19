import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { GlobalVariablesService } from '../shared/global-variables.service';

@Injectable() //in order to inject http service - no need to do this when using @Component because @Component already implement the injection
export class ControlPanelService {

  baseUrl; //the root url
  role;//user role (admin/editor/wathcer)

  errorHandler = error => console.error('control-panel Service error', error);

  constructor(private http: Http,
    private globalvarsService: GlobalVariablesService) {//inject http and globalvarsService services
    this.baseUrl = this.globalvarsService.baseUrl; //assign the base url
    this.role = this.globalvarsService.userDetails.role; //assign the client user that currently using the service role
  }
  //POST HTTP REQUEST -add new user  
  addUser(user) : Promise<any> {
    const json = JSON.stringify(user); //convert user login to json
    console.log(json);//DEBUG
    const headers = new Headers({ 'content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/${this.role}/add-user`, json, { headers: headers }).toPromise() //'Get Request to 'localhost:8080/quote.json'
      .catch(this.errorHandler);
  }
  //DELTE HTTP REQUEST - delete existing user
  deleteUser(user) : Promise<any>  {
    return this.http.delete(`${this.baseUrl}/${this.role}/user/${user._id}`)
      .toPromise()
      .catch(this.errorHandler);
  }
  //PATCH HTTP REQUEST
  updateUser(user)  : Promise<any>{
    const json = JSON.stringify(user);
    console.log(json);//DEBUG    
    const headers = new Headers({ 'content-Type': 'application/json' });
    return this.http.patch(`${this.baseUrl}/${this.role}/user/${user._id}`, json, { headers: headers })
      .toPromise();
  }
  getUsers() : Promise<any> {
    return this.http.get(`${this.baseUrl}/${this.role}/users`).toPromise()
      .then(res => res.json())
      .catch(this.errorHandler);
  }

}
