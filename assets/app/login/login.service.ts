import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { GlobalVariablesService } from '../shared/global-variables.service';

@Injectable() //in order to inject http service - no need to do this when using @Component because @Component already implement the injection
export class LoginService {

  loggedIn = false; //symbolize if the user already loggedIn
  baseUrl; //the root url

  errorHandler = error => console.error('Login Service error', error);

  constructor(private http: Http,
    private globalvarsService: GlobalVariablesService) {//inject http and globalvarsService services
    this.baseUrl = this.globalvarsService.baseUrl; //assign the base url
  }

  //check if the user already logged in (in order to skip login page) 
  //and return boolean
  checklogin() :Promise<any>{
    console.log('sending checklogin to server');
    //get as response to props: loggedin-true/false , user- user details
    return this.http.get(`${this.baseUrl}/login`).toPromise()
      .then(res => {
        let resJson = res.json();
          console.log(res.json())
        if (resJson.loggedin) {
          this.loggedIn = true;
          console.log('loggedin from server true');
          this.globalvarsService.userDetails = resJson.user;
          //TODO save the user response details in the globalvarsService
        }
        return resJson.loggedin;
      })
      .catch(this.errorHandler);


  }
  login(email, password) :Promise<any> { //will return a login response not imidetlly (async)  

    const json = JSON.stringify({ email: email, password: password }); //convert user login to json
    const headers = new Headers({ 'Content-Type': 'application/json' });
    console.log(json);//DEBUG
    return this.http.post(`${this.baseUrl}/login`, json, { headers: headers }).toPromise() //'Get Request to 'localhost:8080/quote.json'
      .then(response => {
        if (response.status == 200) {
          this.globalvarsService.userDetails = response.json().userDetails;
          console.log(this.globalvarsService.userDetails);
          this.loggedIn = true;
          console.log('login succes, response:');
          console.log(response)
        }
        return response;
      })
      .catch(this.errorHandler);
  }
  loginGoogle() {
    return this.http.get(`${this.baseUrl}/auth/google`).toPromise() //'Get Request to 'localhost:8080/auth/google
      .then(res => {
        console.log(res);
      })
      .catch(this.errorHandler);
  }

  logout() :Promise<any>{
    return this.http.post(`${this.baseUrl}/logout`, {}).toPromise()
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          this.loggedIn = false;//user is logged out
          this.globalvarsService.userDetails = null; //delete user details
          console.log('succes');
        }
      })
      .catch(this.errorHandler);
  }

}
