//Vendor libs
import {Component} from 'angular2/core';
import {Router,ROUTER_DIRECTIVES} from 'angular2/router';
import {OnInit} from "angular2/core";
import {NgClass} from 'angular2/common';
//Libs
import {MD_COMPONENTS} from '../';
import {API} from '../../Services';
import {Role} from '../../Model';
@Component({
    selector: 'roles-list',
    template: require('../../Views/roles/List.html'),
	providers: [API],
	directives: [ROUTER_DIRECTIVES,MD_COMPONENTS]
})

export class RolesListComponent implements OnInit
{ 
	constructor (private Api: API, private _router: Router) 
	{
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