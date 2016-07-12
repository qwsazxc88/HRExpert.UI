// Vendor libs
import { Component } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';
import { OnInit, Input } from '@angular/core';

// Libs
import { API } from '../../Services';
import { StaffEstablishedPost } from '../../Model';
import { PositionsViewComponent } from './positions/PositionsView.component';

@Component({
    selector: 'staffestablishedpost-list',
    template: require('./List.html'),
    providers: [API],
    directives: [PositionsViewComponent]
})
export class StaffEstablishedPostListComponent implements OnInit {
    constructor(private Api: API, private _router: Router, private _routeParams: RouteParams) {
    }
    Organization: number;
    Department: number;
    errorMessage: string;
    Model: StaffEstablishedPost[];
    ngOnInit() {
        this.Organization = +this._routeParams.get('organizationid');
        this.Department = +this._routeParams.get('departmentid');
        this.Get();
    }
    Get() {
        this.Api.Organizations(this.Organization).Departments(this.Department).StaffEstablishedPosts().List()
            .subscribe(
            data => this.Model = data,
            error => this.errorMessage = <any>error
            );
    }
    Edit(entity: StaffEstablishedPost) {
        let link = ['StaffEstablishedPostEdit',
            { positionid: entity.Position.Id, organizationid: this.Organization, departmentid: this.Department }];
        this._router.navigate(link);
    }
}
