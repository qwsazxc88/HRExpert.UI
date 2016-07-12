// Vendor libs
import { Component  } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, RouteParams  } from '@angular/router-deprecated';
import { OnInit, Input } from '@angular/core';
// import { NgClass } from '@angular/common';
// Libs
import { API } from '../../Services';
import { BS_DIRECTIVES } from '../BS_DIRECTIVES';
import { APP_UI_COMPONENTS } from '../APP_UI_COMPONENTS';
import { Department } from '../../Model';
import { DepartmentsListComponent } from './DepartmentsList.component';
import { StaffEstablishedPostListComponent } from '../staffestablishedposts/StaffEstablishedPostsList.component';
@Component({
    selector: 'departments-edit',
    template: require('./Edit.html'),
    providers: [API],
    directives: [ROUTER_DIRECTIVES, APP_UI_COMPONENTS, /*BS_DIRECTIVES,*/ DepartmentsListComponent, StaffEstablishedPostListComponent]
})

export class DepartmentEditComponent implements OnInit {
    constructor(private Api: API, private _router: Router, private _routeParams: RouteParams) {
    }
    @Input() Model: Department;
    errorMessage: string;
    Childs: Department[];
    ngOnInit() {
        let departmentid = + this._routeParams.get('departmentid');
        let organizationid = + this._routeParams.get('organizationid');
        if (departmentid > 0 && organizationid > 0) {
            this.Get(departmentid, organizationid);
        }
    }
    Get(departmentid, organizationid) {
        this.Api.Organizations(organizationid).Departments(departmentid).Read()
            .subscribe(
            data  => this.Model = data,
            error => this.errorMessage = <any>error
            );
    }

}
