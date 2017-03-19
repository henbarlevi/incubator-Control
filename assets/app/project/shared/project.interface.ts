/*
interface of the Project object
https://scotch.io/tutorials/how-to-deal-with-different-form-controls-in-angular-2
 */
import {Member} from './member.interface';

export interface Project{
    projectName : string; //text
    source:string; //text
    petitionDate? :string; //date - save it as string
    crew:Object[]; //crew members - each object is a member
    status:string; //select (primitive) - TODO change it (and others if needed) to select (object) https://scotch.io/tutorials/how-to-deal-with-different-form-controls-in-angular-2
    projectDomain:string[]; // multiple select
    filledPitch :Object; // object contain to fields : filled -bool (checkbox YES/NO) and filledReminder - string date (in case he didnt filled pitch)
    filledQuestions :Object; // object contain to fields : filled -bool (checkbox YES/NO) and filledReminder - string date (in case he didnt filled questions)
    signedFinder :Object; // object contain to fields : filled -bool (checkbox YES/NO) and filledReminder - string date (in case he didnt filled finder)
    programSuggested :string[];// multiple select
    eventsReference :Object[];//event references of the project
    businessDevelopment :Object[];//business development of the project
    seedAid:Object[];//seed aid of the project
}