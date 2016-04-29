//Vendor libs
import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {OnInit, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';
//Libs
import {API} from '../../Services';
import {MD_COMPONENTS} from '../MD_COMPONENTS';
import {APP_UI_COMPONENTS} from '../APP_UI_COMPONENTS';
import {Person} from '../../Model';
import {PositionsViewComponent} from '../positions/PositionsView.component'
@Component({
    selector: 'persons-list',
    template: require('../../Views/persons/List.html'),
    providers: [API],
    directives: [ROUTER_DIRECTIVES, APP_UI_COMPONENTS, MD_COMPONENTS,PositionsViewComponent]
})

export class PersonsListComponent implements OnInit {
    constructor (private Api: API, private _router: Router, private _routeParams: RouteParams) {
    }
    Organization: number;
    Department: number;
    Position: number;
    errorMessage: string;
    Model: Person[];
    ngOnInit() {
        this.Organization =+ this._routeParams.get('organizationid');
        this.Department =+ this._routeParams.get('departmentid');
        this.Position =+ this._routeParams.get('positionid');
        this.Get();
    }
    Get() {
        this.Api.Persons.List(this.Organization,this.Department,this.Position)
        .subscribe(
          data=> this.Model=data,
          error=> this.errorMessage=<any>error  
        );
    }    
}