//Vendor libs
import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES,RouteParams} from 'angular2/router';
import {OnInit, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';
//Libs
import {API} from '../../Services';
import {MD_COMPONENTS} from '../MD_COMPONENTS';
import {APP_UI_COMPONENTS} from '../APP_UI_COMPONENTS';
import {Department} from '../../Model';
import {DepartmentsListComponent} from './DepartmentsList.component';
import {StaffEstablishedPostListComponent} from '../staffestablishedposts/StaffEstablishedPostsList.component';
@Component({
    selector: 'departments-edit',
    template: require('../../Views/departments/Edit.html'),
    providers: [API],
    directives: [ROUTER_DIRECTIVES, APP_UI_COMPONENTS, MD_COMPONENTS, DepartmentsListComponent,StaffEstablishedPostListComponent]
})

export class DepartmentEditComponent implements OnInit {
    constructor (private Api: API, private _router: Router, private _routeParams: RouteParams) {
    }
    @Input() Model: Department;    
    errorMessage: string;    
    Childs: Department[];
    ngOnInit() {
        let departmentid =+ this._routeParams.get('departmentid');
        let organizationid =+ this._routeParams.get('organizationid');
		if (departmentid > 0 && organizationid > 0)
		{
			this.Get(departmentid,organizationid);
		}
    }
    Get(departmentid,organizationid) { 
        this.Api.Departments.Read(organizationid,departmentid)
        .subscribe(
            data => { this.Model = data},
            error => this.errorMessage = <any>error   
        );
    }    
    
}