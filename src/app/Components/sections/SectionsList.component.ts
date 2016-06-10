//Vendor libs
import {Component} from '@angular/core';
import {Router,ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {OnInit} from "@angular/core";
import {NgClass} from '@angular/common';
//Libs
import {MD_COMPONENTS} from '../';
import {API} from '../../Services';
import {Section} from '../../Model';
@Component({
    selector: 'sections-list',
    template: require('../../Views/sections/List.html'),
	providers: [API],
	directives: [ROUTER_DIRECTIVES,MD_COMPONENTS]
})

export class SectionsListComponent implements OnInit
{ 
	constructor (private Api: API, private _router: Router) 
	{
	}

    errorMessage: string;
    Model: Section[];

    ngOnInit() {
        this.Get();
	}
	
    Get() {
        this.Api.Sections().List()
					.subscribe(
						result => {this.Model = result;},
						error => this.errorMessage = <any>error
					);
    }
	Edit(entity: Section) {
	  let link = ['SectionEdit', { id: entity.Id }];
	  this._router.navigate(link);
	}
	Create() {
	  let link = ['SectionEdit', { id: 0}];
	  this._router.navigate(link);
	}
}