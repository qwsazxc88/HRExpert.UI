//Vendor libs
import {Component,OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {MdButton, MdAnchor} from '@angular2-material/button';
import {MdToolbar} from '@angular2-material/toolbar';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdRadioButton,MdRadioChange,MdRadioDispatcher,MdRadioGroup} from '@angular2-material/radio';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
//Libs
import {ApiConnector} from "../../ApiConnector/ApiConnector";
import {Organization} from "../../Model/Organization";
import {ComponentBase} from "../ComponentBase";
import {DepartmentsListComponent} from "../departments/DepartmentsList.component"
@Component({
    selector: 'organization-edit',
    template: require('./Edit.html'),
    directives: [DepartmentsListComponent,MD_CARD_DIRECTIVES,MD_INPUT_DIRECTIVES,MdButton],
	providers: [ApiConnector]
})

export class OrganizationEditComponent extends ComponentBase implements OnInit
{ 
	constructor (private Api: ApiConnector, private _routeParams: RouteParams) 
	{
		super();
		this.Model=new Organization(0,'');  
        let id =+this._routeParams.get('id');
		if(id>0)
		{
            this.Model.Id=id;
			this.Get(id);
		}      
	}

    errorMessage: string;
    Model: Organization;
    
    ngOnInit() {
		
    }
	
	Save()
	{
		var data = this.Model;
        if(data.Id>0)
		{
			this.Api.Organizations.Update(data)
				.subscribe(
					result => {this.Model = result; },
					error => this.errorMessage = <any>error
				);
		}
		else
		{
			this.Api.Organizations.Create(data)
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
			this.Api.Organizations.Delete(data)
				.subscribe(                                  
					error => this.errorMessage = <any>error
				);
		}
	}
    Get(id) {
        this.Api.Organizations.Read(id)
			.subscribe(
				result => {this.Model = result; },
				error => this.errorMessage = <any>error
			);
    }
}