import {Component,Input} from 'angular2/core';
import {RolesService} from "./Roles.service";
import {RouteParams} from 'angular2/router';
import {OnInit} from "angular2/core";
import {Role} from "./Role";
@Component({
    selector: 'roles-edit',
    template: require('./Edit.html'),
	providers: [RolesService]
})

export class RoleEditComponent implements OnInit
{ 
	constructor (private _rolesService: RolesService, private _routeParams: RouteParams) {}

    errorMessage: string;
    role: Role;

    ngOnInit() {
		let id = this._routeParams.get('id');
		if(id>0)
		{
			this.getRole(id);
		}
		else
		{
			this.role=new Role();
			this.role.Id=0;
		}
    }
	saveRole()
	{
		var data = this.role;
		if(data.Id>0)
		{
			this._rolesService.editRole(data)
                                .subscribe(
                                    role => {this.role = role; },
                                    error => this.errorMessage = <any>error
                                );
		}
		else
		{
			this._rolesService.createRole(data)
                                .subscribe(
                                    role => {this.role = role; },
                                    error => this.errorMessage = <any>error
                                );
		}
	}
    //обращаемся к созданному нами сервису
    getRole(id) {
        this._rolesService.getRole(id)
                                .subscribe(
                                    role => {this.role = role; },
                                    error => this.errorMessage = <any>error
                                );
    }
}