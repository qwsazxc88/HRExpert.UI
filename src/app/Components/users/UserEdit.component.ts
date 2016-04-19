//Vendor libs
import {Component,Input,OnInit} from 'angular2/core';
import {NgSelectOption,NgModel} from 'angular2/common';
import {RouteParams} from 'angular2/router';
import {MdButton, MdAnchor} from '@angular2-material/button';
import {MdToolbar} from '@angular2-material/toolbar';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdRadioButton,MdRadioChange,MdRadioDispatcher,MdRadioGroup} from '@angular2-material/radio';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
//Libs
import {ApiConnector} from "../../ApiConnector/ApiConnector";
import {User} from "../../Model/User";
import {Role} from "../../Model/Role";
import {ComponentBase} from "../ComponentBase";
import {ArrayTools} from "../../Tools/ArrayTools";
import {ArrayFilterPipe} from "../../Tools/ArrayFilterPipe";
@Component({
    selector: 'users-edit',
    template: require('./Edit.html'),
	directives:[MD_INPUT_DIRECTIVES,MdButton,MD_CARD_DIRECTIVES],
    pipes:[ArrayFilterPipe],
	providers: [ApiConnector]
})

export class UserEditComponent extends ComponentBase implements OnInit
{ 
	constructor (private Api: ApiConnector, private _routeParams: RouteParams) 
	{
		super();
		this.ArrayTool = new ArrayTools();
		this.Model=new User(0,'');
		this.Roles=[];
	}
	

    errorMessage: string;
	ArrayTool: ArrayTools;
    Model: User;
	Roles: Role[];
	SelectedRole: number;
    get UserRoles(){ return this.Model.Roles;}
    ngOnInit() {
		let id=+ this._routeParams.get('id');
		if(id>0)
		{
			this.Get(id);
		}
		this.Api.Roles.List()
					.subscribe(
						roles => {this.Roles = roles; },
						error => this.errorMessage = <any>error
					);

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
		if(!this.SelectedRole) return;
		var role = this.Roles.find(x=>x.Id==this.SelectedRole);
		if(role)
		{
			this.Model.Roles.push(role);
		}        
        this.Model=this.Model;
	}
	RemoveRole(role)
	{
		this.ArrayTool.RemoveFromArray(this.Model.Roles,role);
	}
	
    Get(id) {
        this.Api.Users.Read(id)
					.subscribe(
						user => {this.Model = user; },
						error => this.errorMessage = <any>error
					);
    }
}