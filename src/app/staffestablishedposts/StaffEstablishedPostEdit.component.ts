// Vendor libs
import { Component } from '@angular/core';
// import { Router, RouteParams } from '@angular/router';
import { OnInit, Input } from '@angular/core';

// Libs
import { API } from '../Services';
import { StaffEstablishedPost } from '../Model';
// import { PositionsViewComponent } from './positions/PositionsView.component';
import { PersonsListComponent } from './persons/PersonsList.component';

@Component({
    selector: 'staffestablishedpost-edit',
    template: require('./Edit.html'),
    providers: [API],
    directives: [/*PositionsViewComponent,*/ PersonsListComponent]
})
export class StaffEstablishedPostEditComponent implements OnInit {
    constructor(private Api: API, private _router: Router, private _routeParams: RouteParams) {
    }
    Organization: number;
    Department: number;
    Position: number;
    errorMessage: string;
    Model: StaffEstablishedPost;
    ngOnInit() {
        this.Organization = +this._routeParams.get('organizationid');
        this.Department = +this._routeParams.get('departmentid');
        this.Position = +this._routeParams.get('positionid');
        this.Get();
    }
    Get() {
        this.Api.Organizations(this.Organization).Departments(this.Department).StaffEstablishedPosts(this.Position).Read()
            .subscribe(
            data => this.Model = data,
            error => this.errorMessage = <any>error
            );
    }
}
