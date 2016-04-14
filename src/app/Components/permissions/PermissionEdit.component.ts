//Vendor libs
import {Component,OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
//Libs
import {ApiConnector} from "../../ApiConnector/ApiConnector";
import {Section} from "../../Model/Section";
import {Permission} from "../../Model/Permission";
import {ComponentBase} from "../ComponentBase"

@Component({
    selector: 'permission-edit',
    template: require('./Edit.html'),
	providers: [ApiConnector]
})

export class PermissionEditComponent extends ComponentBase implements OnInit
{ 
	constructor (private Api: ApiConnector, private _routeParams: RouteParams) 
	{
		super();
		this.Model=new Permission(0,'');
        Api.Sections.List()
            .subscribe(
				result => {this.Sections = result; },
				error => this.errorMessage = <any>error
			);;
	}

    errorMessage: string;
    Model: Permission;
    Sections : Section[];
    SelectedSection: number;
    
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
        data.Section = this.Sections.filter(x=>x.Id==this.SelectedSection)[0];
        console.log(data);
		if(data.Id>0)
		{
			this.Api.Permissions.Update(data)
				.subscribe(
					result => {this.Model = result; },
					error => this.errorMessage = <any>error
				);
		}
		else
		{
			this.Api.Permissions.Create(data)
				.subscribe(
					result => {this.Model = result; },
					error => this.errorMessage = <any>error
				);
		}
	}
	Delete()
	{
		var data = this.Model;
		if(data.Id>0)
		{
			this.Api.Permissions.Delete(data)
				.subscribe(                                  
					error => this.errorMessage = <any>error
				);
		}
	}
    Get(id) {
        this.Api.Permissions.Read(id)
			.subscribe(
				result => {this.Model = result; this.SelectedSection=this.Model.Section.Id; },
				error => this.errorMessage = <any>error
			);
    }
}