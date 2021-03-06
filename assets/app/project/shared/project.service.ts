/*project that sends http request for project
post new project, get all proejcts, get projects by name etc..
the service get the base url and the loggedin user role from the GlobalVariablesService
 */
import { Http, Headers, URLSearchParams, RequestOptions, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
import { GlobalVariablesService } from '../../shared/global-variables.service';
import * as FileSaver from 'file-saver';
@Injectable() //in order to inject services - no need to do this when using @Component because @Component already implement the injection
export class ProjectService {

  baseUrl; //the root url
  role;//user role (admin/editor/wathcer)
  errorHandler = error => console.error('project Service error', error);

  constructor(private http: Http,
    private globalvarsService: GlobalVariablesService) {//inject http and globalvarsService services
    this.baseUrl = this.globalvarsService.baseUrl; //assign the base url
    this.role = () => { return this.globalvarsService.userDetails.role }; //assign the client user that currently using the service role

  }

  //GET HTTP REQUEST -get all projects 
  getProjects() : Promise<any> {
    return this.http.get(`${this.baseUrl}/${this.role()}/project`)
      .toPromise()
      .then(response => response.json().projects)
      .catch(this.errorHandler);
  }
  //GET HTTP REQUEST - get project by id  (with full details)
  getProjectById(projectId) : Promise<any> {
    //console.log(project);//DEBUG
    //console.log(json);//DEBUG    
    const headers = new Headers({ 'content-Type': 'application/json' });
    return this.http.get(`${this.baseUrl}/${this.role()}/project/${projectId}`, { headers: headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.errorHandler);
  }
  //GET HTTP REQUEST - get projects by name
  getProjectsByName(name) : Promise<any> {
    //setting name as a queryString parameter:
    let params: URLSearchParams = new URLSearchParams();
    params.set('name', name);
    return this.http.get(`${this.baseUrl}/${this.role()}/project`, { search: params })
      .toPromise()
      .then(response => response.json().projects)
      .catch(this.errorHandler);
  }
  //GET HTTP REQUEST - get projects by name
  getProjectsByDomain(domain) : Promise<any>{
    //setting domain as a queryString parameter:
    let params: URLSearchParams = new URLSearchParams();
    params.set('domain', domain);
    return this.http.get(`${this.baseUrl}/${this.role()}/project`, { search: params })
      .toPromise()
      .then(response => response.json().projects)
      .catch(this.errorHandler);
  }
  //POST HTTP REQUEST -add new project  
  addProject(project) : Promise<any> {
    const json = JSON.stringify(project); //convert project to json
    console.log(json);//DEBUG
    const headers = new Headers({ 'content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/${this.role()}/project`, json, { headers: headers }).toPromise()
      .catch(this.errorHandler);
  }
  //DELTE HTTP REQUEST - delete existing project
  deleteProject(project)  : Promise<any> {
    return this.http.delete(`${this.baseUrl}/${this.role()}/project/${project._id}`)
      .toPromise()
      .catch(this.errorHandler);
  }
  //UPDATE HTTP REQUEST
  updateProject(project) : Promise<any>{
    console.log(project);//DEBUG
    const json = JSON.stringify(project);
    console.log(json);//DEBUG    
    const headers = new Headers({ 'content-Type': 'application/json' });
    return this.http.patch(`${this.baseUrl}/${this.role()}/project/${project._id}`, json, { headers: headers })
      .toPromise();
  }
  uploadFiles(formData, project) : Promise<any> {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.baseUrl}/${this.role()}/project/uploadfile/${project._id}`, formData, options)
      .toPromise()
      .catch(this.errorHandler);
  }
  //GET HTTP REQUEST - download all files of project (.zip)
  downloadProjectFiles(project) : Promise<any> {

    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/zip' });
    let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });

    return this.http.get(`${this.baseUrl}/${this.role()}/project/download/${project._id}`, options)
      .toPromise().then(res => this.extractContent(res, project.projectName))
      .catch(this.errorHandler);
  }
  private extractContent(res, filename) {
    console.log(res);//DEBUG
    let blob: Blob = res.blob();
    FileSaver['saveAs'](blob, filename);
  }
  //GET HTTP REQUEST - download a specific file of project (.doc/.docx/etc..)
  downloadFile(fieldName, project) : Promise<any>{
    //setting fieldName as a queryString parameter:
    let params: URLSearchParams = new URLSearchParams();
    params.set('fieldname', fieldName);
    let options = new RequestOptions({ responseType: ResponseContentType.Blob, search: params });
    return this.http.get(`${this.baseUrl}/${this.role()}/project/file/${project._id}`, options)
      .toPromise().then(res => this.extractContent(res, fieldName))
      .catch(this.errorHandler);
  }
  //GET HTTP REQUEST - download a specific group of files (marketing,poc etc..) as zip
  downloadMultiFiles(fieldName, project) : Promise<any> {
    //setting fieldName as a queryString parameter:
    let params: URLSearchParams = new URLSearchParams();
    params.set('fieldname', fieldName);
    let options = new RequestOptions({ responseType: ResponseContentType.Blob, search: params });
    return this.http.get(`${this.baseUrl}/${this.role()}/project/files/${project._id}`, options)
      .toPromise().then(res => this.extractContent(res, fieldName))
      .catch(this.errorHandler);
  }
}
