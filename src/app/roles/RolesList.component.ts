import {Component} from 'angular2/core';
import {RolesService} from "./Roles.service";
import { Router } from 'angular2/router';
import {OnInit} from "angular2/core";
import {Role} from "./Role";
@Component({
    selector: 'roles-list',
    template: require('./List.html'),
	providers: [RolesService]
})

export class RolesListComponent implements OnInit
{ 
	constructor (private _rolesService: RolesService, private _router: Router) {}

    errorMessage: string;
    roles: Role[];

    ngOnInit() {
        this.getRoles();
    }
    getRoles() {
        this._rolesService.getRoles()
                                .subscribe(
                                    roles => {this.roles = roles;},
                                    error => this.errorMessage = <any>error
                                );
    }
	gotoEdit(role: Role) {
	  let link = ['RoleEdit', { id: role.Id }];
	  this._router.navigate(link);
	}
	gotoCreate() {
	  let link = ['RoleEdit', { id: 0}];
	  this._router.navigate(link);
	}
}