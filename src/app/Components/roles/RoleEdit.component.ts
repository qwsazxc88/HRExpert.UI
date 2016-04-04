//Vendor libs
import {Component,Input} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {OnInit} from "angular2/core";
//Libs
import {ApiConnector} from "../../ApiConnector";
import {Role} from "../../Model/Role";
import {ComponentBase} from "../ComponentBase"

@Component({
    selector: 'roles-edit',
    template: require('./Edit.html'),
	providers: [ApiConnector]
})

export class RoleEditComponent extends ComponentBase implements OnInit
{ 
	constructor (private Api: ApiConnector, private _routeParams: RouteParams) 
	{
		super();
		this.Model=new Role(0,'');
	}

    errorMessage: string;
    Model: Role;

    ngOnInit() {
		let id =+this._routeParams.get('id');
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
			this.Api.Roles.Update(data)
                                .subscribe(
                                    role => {this.Model = role; },
                                    error => this.errorMessage = <any>error
                                );
		}
		else
		{
			this.Api.Roles.Create(data)
                                .subscribe(
                                    role => {this.Model = role; },
                                    error => this.errorMessage = <any>error
                                );
		}
	}
	Delete()
	{
		var data = this.Model;
		if(data.Id>0)
		{
			this.Api.Roles.Delete(data)
                                .subscribe(                                  
                                    error => this.errorMessage = <any>error
                                );
		}
	}
    //обращаемся к созданному нами сервису
    Get(id) {
        this.Api.Roles.Read(id)
                                .subscribe(
                                    role => {this.Model = role; },
                                    error => this.errorMessage = <any>error
                                );
    }
}