// Vendor libs
import { Component } from '@angular/core';
// import { Router, RouteParams } from '@angular/router-deprecated';
import { OnInit, Input } from '@angular/core';

// Libs
import { API } from '../../Services';


import { Person } from '../../Model';
import { PositionsViewComponent } from '../positions/PositionsView.component';

@Component({
    selector: 'persons-list',
    template: require('./List.html'),
    providers: [API],
    directives: [ /* /*BS_DIRECTIVES,*/ PositionsViewComponent]
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
