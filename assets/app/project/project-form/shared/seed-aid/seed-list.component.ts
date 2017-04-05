/*
component that display the 'seeds' references of a project
seeds - object array , each object is an seed
each seed diplayed its name, date ,location and status props and 2 buttons of 'delete' and 'edit'
delete button - when clicking the seed will be transferd to the onEdit method that
will buble the seed outside, the seed should be delete from outside
edit button - when clicking the seed will be transferd to the onDelete method that
will buble the seed outside, the seed should be Edited from outside
 http://bootsnipp.com/snippets/Pb45*/
import { Component, EventEmitter, Input, Output ,OnInit} from '@angular/core';
@Component({
  selector: 'seed-list',
  template: `

   
   <div class="panel panel-default">
    <div class="row">
        <div class="col-sm-12 col-md-12 ">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th> סיועים בגיוס </th>
                        <th> Action </th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let seed of seeds">
                        <td class="col-sm-8 ">
                        <div class="media">
                            <div class="thumbnail pull-left">
                            <a  href="#"> <img class="media-object" src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png" style="width: 72px; height: 72px;"> </a>
                            <h5>{{seed.source}}</h5>
                            </div>
                            <div class="media-body">
                                <h4 class="media-heading"><a href="#">$ {{seed.investmentAmount}}</a></h4>
                                <h5 class="media-heading">{{seed.eventName}} : {{seed.startDate}} - {{seed.endDate}}</h5>
                                <h5 class="media-heading"><b>{{seed.investmentAmount/seed.companyValue * 100}}%</b> - (ערך החברה : {{seed.companyValue}} )</h5>                                
                                <span> סטטוס : </span><span class="text-success"><strong>{{seed.status}}</strong></span>
                                <h3 class="bg-primary" >  תוצאה : {{seed.result}}</h3>
                            </div>
                        </div></td>
                        <td class="col-sm-1 col-md-1">
                        <button type="button" class="btn btn-danger" (click)="onRemove(seed)">
                            <span class="glyphicon glyphicon-remove"></span> Remove
                        </button>
                         <button type="button" class="btn btn-primary" (click)="onEdit(seed)">
                            <span class="glyphicon glyphicon-pencil"></span> EDIT
                        </button>
                      
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td><h3>Total</h3></td>
                        <td class="text-right"><h3>$31.53</h3></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</div>
  `,
  styles:[`
  th,td{
    text-align:center;
  }
 button{
      width:90%;
  }
  `]
  //required - the field is required
}) //button type="button" IMPORTANT -in order to prevent the defualt behavior of submiting when clicking on any button in the form 
  //(even if its not type="submit") we declared it as type="button"

export class SeedListComponent implements OnInit{



  @Input() seeds=[];//2 way binding prop that contain the details of the project events reference
  @Output() remove = new EventEmitter<Object>();//raise the event clicked to the outer wrapping component (event binding)
  @Output() edit = new EventEmitter<Object>();//raise the event clicked to the outer wrapping component (event binding)
  
  constructor() { 

  }
  ngOnInit() {
    //initialize the events prop - to prevent null error case 
  }
  onRemove(seed) {

    this.remove.emit(seed);
  }
  onEdit(seed) {
    this.edit.emit(seed);
  }

}