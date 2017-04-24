
/* contain global vars (baseUrl for example) that are used across the app */

export class GlobalVariablesService {

    //prod:
  //baseUrl = 'http://incubator-control-demo.herokuapp.com';
    //development:
  baseUrl = 'http://localhost:3000';
  
  sourcesOptions: string[] = ['אינטרנט', 'יועץ', 'ניר עופר', 'אחר']; //options of sources,from where the project owner came to the incubation, this prop used by combo boxes to display options
  
  _statusOptions: string[] = ['Pre Seed', 'Seed', 'Round A', 'חברה בוגרת עם מכירות']//options of status of the project, this prop used by combo boxes to display options
 get statusOptions(){
     return this._statusOptions;
 }
 set statusOptions(value){
     this._statusOptions = value;
 } 
  domainOptions: string[] = [ 'Gaming','Technology', 'Lifestyle' ];//options of project domain, this prop used by MULTIPLE SELECT to display options

programSuggestions:string[] = ['אינקובציה','פיתוח עסקי','הפנייה לארועים','סיוע בגיוס השקעות']; //options of the program the project is in , this prop used by MultiSelcect to display options
  //contain the loggedin user details (user details are saved in the local storage):
 _userDetails = { email:'' , firstName:'' ,lastName:'', role:''};
    get userDetails() {
        debugger;
        if(!localStorage.getItem('userDetails')){ //if userDetails doesnt exist in storage
            return undefined;
        }
        return JSON.parse(localStorage.getItem('userDetails'));;
    }
    set userDetails(value) {
        debugger;
        if(!value){//if value is undefiend/null
            localStorage.removeItem('userDetails'); // remove user details from storage
        }else{

        localStorage.setItem('userDetails',JSON.stringify(value));
        }
    } //contain user details (without password)


    //routingReservationData -saves data in order to pass data from one route to another
    _routingReservationData = {};
    get routingReservationData() {
        debugger;
        if(!localStorage.getItem('routingReservationData')){ //if routingReservationData doesnt exist in storage
            return undefined;
        }
        return JSON.parse(localStorage.getItem('routingReservationData'));;
    }
    set routingReservationData(value) {
        debugger;
        if(!value){//if value is undefiend/null
            localStorage.removeItem('routingReservationData'); // remove routingReservationData from storage
        }else{

        localStorage.setItem('routingReservationData',JSON.stringify(value));
        }
    }

}
