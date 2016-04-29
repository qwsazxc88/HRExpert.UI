//Vendor libs
import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {OnInit, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';
//Libs
import {API} from '../../Services';
import {MD_COMPONENTS} from '../MD_COMPONENTS';
import {APP_UI_COMPONENTS} from '../APP_UI_COMPONENTS';
import {Department} from '../../Model';

@Component({
    selector: 'departments-list',
    template: require('../../Views/departments/List.html'),
    providers: [API],
    directives: [ROUTER_DIRECTIVES, APP_UI_COMPONENTS, MD_COMPONENTS,DepartmentsListComponent]
})

export class DepartmentsListComponent implements OnInit {
    constructor (private Api: API, private _router: Router, private _routeParams: RouteParams) {
        this.toggled=false;    
    }
    Organization: number;    
    errorMessage: string;
    toggled: boolean;
    @Input() Model: Department;
    Childs: Department[];
    ngOnInit() {        
        this.Organization =+ this._routeParams.get('organizationid');
    }
    Get() { 
    }
    Edit() {
	  let link = ['DepartmentEdit', { departmentid: this.Model.Id, organizationid: this.Organization }];
	  this._router.navigate(link);
	}
    GetChilds()
    {
        this.Api.Departments.Childs(this.Organization,this.Model.Id)
            .subscribe(
                data => {this.Childs = data;},
                error => this.errorMessage = <any>error
             );
    }
    Toggle()
    {
        this.toggled=!this.toggled;
        if(this.toggled && !this.Childs) this.GetChilds();
    }
}