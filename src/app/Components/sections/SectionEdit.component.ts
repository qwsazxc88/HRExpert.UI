//Vendor libs
import {Component,Input} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {OnInit} from "angular2/core";
//Libs
import {ApiConnector} from "../../ApiConnector";
import {Section} from "../../Model/Section";
import {ComponentBase} from "../ComponentBase"

@Component({
    selector: 'section-edit',
    template: require('./Edit.html'),
	providers: [ApiConnector]
})

export class SectionEditComponent extends ComponentBase implements OnInit
{ 
	constructor (private Api: ApiConnector, private _routeParams: RouteParams) 
	{
		super();
		this.Model=new Section(0,'');
	}

    errorMessage: string;
    Model: Section;

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
			this.Api.Sections.Update(data)
                                .subscribe(
                                    result => {this.Model = result; },
                                    error => this.errorMessage = <any>error
                                );
		}
		else
		{
			this.Api.Sections.Create(data)
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
			this.Api.Sections.Delete(data)
                                .subscribe(                                  
                                    error => this.errorMessage = <any>error
                                );
		}
	}
    Get(id) {
        this.Api.Sections.Read(id)
                                .subscribe(
                                    result => {this.Model = result; },
                                    error => this.errorMessage = <any>error
                                );
    }
}