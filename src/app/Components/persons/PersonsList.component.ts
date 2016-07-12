// Vendor libs
import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';
import { OnInit, Input } from '@angular/core';
// import { NgClass } from '@angular/common';
// Libs
import { API } from '../../Services';
import { BS_DIRECTIVES } from '../BS_DIRECTIVES';
import { APP_UI_COMPONENTS } from '../APP_UI_COMPONENTS';
import { Person } from '../../Model';
import { PositionsViewComponent } from '../positions/PositionsView.component';
@Component({
    selector: 'persons-list',
    template: require('./List.html'),
    providers: [API],
    directives: [ROUTER_DIRECTIVES, APP_UI_COMPONENTS, /*BS_DIRECTIVES,*/ PositionsViewComponent]
})

export class PersonsListComponent implements OnInit {
    constructor(private Api: API, private _router: Router, private _routeParams: RouteParams) {
    }
    Organization: number;
    Department: number;
    Position: number;
    errorMessage: string;
    Model: Person[];
    ngOnInit() {
        this.Organization = + this._routeParams.get('organizationid');
        this.Department = + this._routeParams.get('departmentid');
        this.Position = + this._routeParams.get('positionid');
        this.Get();
    }
    Get() {
        this.Api.Organizations(this.Organization)
            .Departments(this.Department)
            .StaffEstablishedPosts(this.Position)
            .Persons()
            .List()
            .subscribe(
            data => this.Model = data,
            error => this.errorMessage = <any>error
            );
    }
}
