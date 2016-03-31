//Vendor libs
import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {OnInit} from "angular2/core";
//Libs
import {ApiConnector} from "../../ApiConnector";
import {Role} from "../../Model/Role";

@Component({
    selector: 'roles-list',
    template: require('./List.html'),
	providers: [ApiConnector]
})

export class RolesListComponent implements OnInit
{ 
	constructor (private Api: ApiConnector, private _router: Router) {}

    errorMessage: string;
    Model: Role[];

    ngOnInit() {
        this.Get();
    }
    Get() {
        this.Api.Roles.List()
					.subscribe(
						roles => {this.Model = roles;},
						error => this.errorMessage = <any>error
					);
    }
	Edit(role: Role) {
	  let link = ['RoleEdit', { id: role.Id }];
	  this._router.navigate(link);
	}
	Create() {
	  let link = ['RoleEdit', { id: 0}];
	  this._router.navigate(link);
	}
}