//Vendor libs
import {Component,Input} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {OnInit} from "angular2/core";
//Libs
import {ApiConnector} from "../../ApiConnector";
import {User} from "../../Model/User";
import {Role} from "../../Model/Role";
import {ComponentBase} from "../ComponentBase"

@Component({
    selector: 'users-edit',
    template: require('./Edit.html'),
	providers: [ApiConnector]
})

export class UserEditComponent extends ComponentBase implements OnInit
{ 
	constructor (private Api: ApiConnector, private _routeParams: RouteParams) 
	{
		this.Model=new User(0,'');
		this.Roles=[];
		this.Roles.push(new Role(1,"test"));
	}
	

    errorMessage: string;
    Model: User;
	Roles: Role[];
	SelectedRole: Role;
    ngOnInit() {
		let id=+ this._routeParams.get('id');
		if(id>0)
		{
			this.Get(id);
		}
    }
	Save()
	{
		var data = this.Model;
		if(data.Id>0)
		{
			this.Api.Users.Update(data)
						.subscribe(
							user => {this.Model = user; },
							error => this.errorMessage = <any>error
						);
		}
		else
		{
			this.Api.Users.Create(data)
						.subscribe(
							user => {this.Model = user; },
							error => this.errorMessage = <any>error
						);
		}
	}
	Delete()
	{
		var data = this.Model;
		this.Api.Users.Delete(data)
						.subscribe(
							error => this.errorMessage = <any>error
						);
	}
	AddRole()
	{
		this.Model.Roles.push(this.SelectedRole);
	}
	ChangeSelected(value)
	{
		console.log(value);
		this.SelectedRole=value;
	}
    Get(id) {
        this.Api.Users.Read(id)
					.subscribe(
						user => {this.Model = user; },
						error => this.errorMessage = <any>error
					);
    }
}