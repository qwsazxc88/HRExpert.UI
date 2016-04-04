//Vendor libs
import {Component} from 'angular2/core';
import {Router,OnActivate,onDeactivate,ROUTER_DIRECTIVES} from 'angular2/router';
import {OnInit} from "angular2/core";
import {NgClass} from 'angular2/common';
//Libs
import {ApiConnector} from "../../ApiConnector";
import {Role} from "../../Model/Role";
import {ComponentBase} from "../ComponentBase"
@Component({
    selector: 'roles-list',
    template: require('./List.html'),
	providers: [ApiConnector],
	directives: [ROUTER_DIRECTIVES]
})

export class RolesListComponent extends ComponentBase implements OnInit
{ 
	constructor (private Api: ApiConnector, private _router: Router) 
	{
		this.active=true;
	}

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