//Vendor libs
import {Component,Input} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {OnInit} from "angular2/core";
//Libs
import {MD_COMPONENTS} from '../';
import {API} from '../../Services';
import {Role,Section,Permission} from '../../Model';

import {ArrayTools} from '../../Tools/ArrayTools/ArrayTools';
import {ArrayFilterPipe} from '../../Tools/ArrayTools/ArrayFilterPipe';
import {IdFilterPipe} from '../../Tools/ArrayTools/IdFilterPipe';
@Component({
    selector: 'roles-edit',
    template: require('../../Views/roles/Edit.html'),    
    pipes:[ArrayFilterPipe,IdFilterPipe],
    directives:[MD_COMPONENTS],
	providers: [API]
})

export class RoleEditComponent implements OnInit
{ 
	constructor (private Api: API, private _routeParams: RouteParams) 
	{
		this.Model=new Role(0,'');
        this.Permissions = [];
        this.Sections = [];        
		this.ArrayTool = new ArrayTools();
	}

    errorMessage: string;
    Model: Role;
    Sections : Section[];
    Permissions: Permission[];
    SelectedPermission: number;
    SelectedSection: number;
    ArrayTool: ArrayTools;
    
    ngOnInit() {
		let id =+this._routeParams.get('id');
		if(id>0)
		{
			this.Get(id);
		}
        this.Api.Permissions.List()
                .subscribe(
                    data => {this.Permissions = data; },
                    error => this.errorMessage = <any>error
                );
        this.Api.Sections.List()
                .subscribe(
                    data => {this.Sections = data; },
                    error => this.errorMessage = <any>error
                );
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
    AddPermission()
	{
		if(!this.SelectedPermission) return;
		var role = this.Permissions.find(x=>x.Id==this.SelectedPermission);
		if(role)
		{
			this.Model.Permissions.push(role);
		}        
        this.Model=this.Model;
	}
	RemovePermission(permission)
	{
		this.ArrayTool.RemoveFromArray(this.Model.Permissions,permission);
	}
}