// Vendor libs
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
// Libs
import { API } from '../Services';
import { User, Role } from '../Model';
import { RemoveFromArray } from '../Utils/ArrayUtils/ArrayUtils';
import { ArrayFilterPipe } from '../Utils/ArrayUtils/ArrayFilterPipe';

@Component({
    selector: 'users-edit',
    template: require('./Edit.html'),
    // directives: [],
    pipes: [ArrayFilterPipe],
    providers: [API]
})
export class UserEditComponent implements OnInit {
    constructor(private Api: API, ars: ActivatedRoute) {
        this.Model = new User(0, '');
        this.Roles = [];
        this._routeParams = ars.snapshot.params;
    }

    _routeParams: Params;
    errorMessage: string;
    Model: User;
    Roles: Role[];
    SelectedRole: number;

    get UserRoles() { return this.Model.Roles; }

    ngOnInit() {
        let id = + this._routeParams['id'];
        if (id > 0) {
            this.Get(id);
        }
        this.Api.Roles().List()
            .subscribe(
            roles => { this.Roles = roles; },
            error => this.errorMessage = <any>error
            );
    }

    Save() {
        let data = this.Model;
        if (data.Id > 0) {
            this.Api.Users().Update(data)
                .subscribe(
                user => { this.Model = user; },
                error => this.errorMessage = <any>error
                );
        } else {
            this.Api.Users().Create(data)
                .subscribe(
                user => { this.Model = user; },
                error => this.errorMessage = <any>error
                );
        }
    }

    Delete() {
        let data = this.Model;
        this.Api.Users(data.Id).Delete()
            .subscribe(
            error => this.errorMessage = <any>error
            );
    }

    AddRole() {
        if (!this.SelectedRole) return;
        var role = this.Roles.find(x => x.Id == this.SelectedRole);
        if (role) {
            this.Model.Roles.push(role);
        }
        this.Model = this.Model;
    }

    RemoveRole(role) {
        RemoveFromArray(this.Model.Roles, role);
    }

    Get(id) {
        this.Api.Users(id).Read()
            .subscribe(
            user => { this.Model = user; },
            error => this.errorMessage = <any>error
            );
    }
}
