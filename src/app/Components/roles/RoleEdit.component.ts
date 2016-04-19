//Vendor libs
import {Component,Input} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {OnInit} from "angular2/core";
import {MdButton, MdAnchor} from '@angular2-material/button';
import {MdToolbar} from '@angular2-material/toolbar';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdRadioButton,MdRadioChange,MdRadioDispatcher,MdRadioGroup} from '@angular2-material/radio';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
//Libs
import {ApiConnector} from "../../ApiConnector/ApiConnector";
import {Role} from "../../Model/Role";
import {Section} from "../../Model/Section";
import {Permission} from "../../Model/Permission";
import {ComponentBase} from "../ComponentBase";
import {ArrayTools} from "../../Tools/ArrayTools";
import {ArrayFilterPipe} from "../../Tools/ArrayFilterPipe";
import {IdFilterPipe} from "../../Tools/IdFilterPipe"
@Component({
    selector: 'roles-edit',
    template: require('./Edit.html'),    
    pipes:[ArrayFilterPipe,IdFilterPipe],
    directives:[MD_INPUT_DIRECTIVES,MdButton,MD_CARD_DIRECTIVES],
	providers: [ApiConnector]
})

export class RoleEditComponent extends ComponentBase implements OnInit
{ 
	constructor (private Api: ApiConnector, private _routeParams: RouteParams) 
	{
		super();
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