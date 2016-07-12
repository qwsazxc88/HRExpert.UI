// Vendor libs
import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

// Libs
import { API } from '../../Services';
import { Organization, Department } from '../../Model';
import { BS_DIRECTIVES } from '../BS_DIRECTIVES';
import { DepartmentsListComponent } from '../departments/DepartmentsList.component';
@Component({
    selector: 'organization-edit',
    template: require('./Edit.html'),
    directives: [DepartmentsListComponent, /*BS_DIRECTIVES,*/ ],
    providers: [API]
})

export class OrganizationEditComponent implements OnInit {
    constructor(private Api: API, private _routeParams: RouteParams) {
        this.Model = new Organization(0, '');
        let id = +this._routeParams.get('organizationid');
        if (id > 0) {
            this.Model.Id = id;
            this.Get(id);
        }
    }

    errorMessage: string;
    Model: Organization;
    Departments: Department[];

    ngOnInit() {

    }

    Save() {
        var data = this.Model;
        if (data.Id > 0) {
            this.Api.Organizations().Update(data)
                .subscribe(
                result => { this.Model = result; },
                error => this.errorMessage = <any>error
                );
        } else {
            this.Api.Organizations().Create(data)
                .subscribe(
                result => { this.Model = result; },
                error => this.errorMessage = <any>error
                );
        }
    }
    Delete() {
        var data = this.Model;
        if (data.Id > 0) {
            this.Api.Organizations(data.Id).Delete()
                .subscribe(
                error => this.errorMessage = <any>error
                );
        }
    }
    Get(id) {
        this.Api.Organizations(id).Read()
            .subscribe(
            result => { this.Model = result; },
            error => this.errorMessage = <any>error
            );
        this.Api.Organizations(id).Departments().List()
            .subscribe(
            result => { this.Departments = result; },
            error => this.errorMessage = <any>error
            );
    }
}
