//Vendor libs
import {Component} from 'angular2/core';
import {Router,ROUTER_DIRECTIVES} from 'angular2/router';
import {OnInit} from "angular2/core";
import {NgClass} from 'angular2/common';
import {MdButton, MdAnchor} from '@angular2-material/button';
import {MdToolbar} from '@angular2-material/toolbar';
//Libs
import {ApiConnector} from "../../ApiConnector/ApiConnector";
import {Organization} from "../../Model/Organization";
import {ComponentBase} from "../ComponentBase"
@Component({
    selector: 'organization-list',
    template: require('./List.html'),
	providers: [ApiConnector],
	directives: [ROUTER_DIRECTIVES,MdButton,MdToolbar]
})

export class OrganizationListComponent extends ComponentBase implements OnInit
{ 
	constructor (private Api: ApiConnector, private _router: Router) 
	{
		super();
	}

    errorMessage: string;
    Model: Organization[];

    ngOnInit() {
        this.Get();
	}
	
    Get() {
        this.Api.Organizations.List()
					.subscribe(
						result => {this.Model = result;},
						error => this.errorMessage = <any>error
					);
    }
	Edit(entity: Organization) {
	  let link = ['OrganizationEdit', { id: entity.Id }];
	  this._router.navigate(link);
	}
	Create() {
	  let link = ['OrganizationEdit', { id: 0}];
	  this._router.navigate(link);
	}
}