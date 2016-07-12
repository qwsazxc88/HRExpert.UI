// Vendor libs
import { Component, Input } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { OnInit } from '@angular/core';
// Libs
// import { BS_DIRECTIVES } from '../';
import { API } from '../../Services';
import { Role, Section, Permission } from '../../Model';

import { RemoveFromArray } from '../../Utils/ArrayUtils/ArrayUtils';
import { ArrayFilterPipe } from '../../Utils/ArrayUtils/ArrayFilterPipe';
import { IdFilterPipe } from '../../Utils/ArrayUtils/IdFilterPipe';

@Component({
    selector: 'roles-edit',
    template: require('././Edit.html'),
    pipes: [ArrayFilterPipe, IdFilterPipe],
    directives: [/*BS_DIRECTIVES,*/ ],
    providers: [API]
})

export class RoleEditComponent implements OnInit {
    constructor(private Api: API, private _routeParams: RouteParams) {
        this.Model = new Role(0, '');
        this.Permissions = [];
        this.Sections = [];
        this.SelectedSections = [];
    }

    errorMessage: string;
    Model: Role;
    Sections: Section[];
    Permissions: Permission[];
    SelectedSections: number[];
    SelectedPermissionId: number;

    ngOnInit() {
        let id = +this._routeParams.get('id');
        if (id > 0) {
            this.Get(id);
        }
        this.Api.Permissions().List()
            .subscribe(
            data => { this.Permissions = data; },
            error => this.errorMessage = <any>error
            );
        this.Api.Sections().List()
            .subscribe(
            data => { this.Sections = data; },
            error => this.errorMessage = <any>error
            );
    }

    Save() {
        var data = this.Model;
        if (data.Id > 0) {
            this.Api.Roles().Update(data)
                .subscribe(
                role => { this.Model = role; },
                error => this.errorMessage = <any>error
                );
        } else {
            this.Api.Roles().Create(data)
                .subscribe(
                role => { this.Model = role; },
                error => this.errorMessage = <any>error
                );
        }
    }
    Delete() {
        var data = this.Model;
        if (data.Id > 0) {
            this.Api.Roles(data.Id).Delete()
                .subscribe(
                error => this.errorMessage = <any>error
                );
        }
    }
    Get(id) {
        this.Api.Roles(id).Read()
            .subscribe(
            role => { this.Model = role; },
            error => this.errorMessage = <any>error
            );
    }
    AddPermission() {
        if (!this.SelectedPermissionId) return;
        var role = this.Permissions.find(x => x.Id == this.SelectedPermissionId);
        if (role) {
            this.Model.Permissions.push(role);
        }
        this.Model = this.Model;
    }
    RemovePermission(permission) {
        RemoveFromArray(this.Model.Permissions, permission);
    }

    PermissionClicked(section) {
        this.SelectedSections.includes(section.Id) ?
            RemoveFromArray(this.SelectedSections, section.Id)
            : this.SelectedSections.push(section.Id);
        ;
    }
}
