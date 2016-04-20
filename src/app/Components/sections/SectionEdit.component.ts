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
import {MD_COMPONENTS} from '../';
import {API} from '../../Services';
import {Section} from '../../Model';

@Component({
    selector: 'section-edit',
    template: require('../../Views/sections/Edit.html'),
    directives:[MD_COMPONENTS],
	providers: [API]
})

export class SectionEditComponent implements OnInit
{ 
	constructor (private Api: API, private _routeParams: RouteParams) 
	{
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