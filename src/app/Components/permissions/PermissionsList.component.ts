//Vendor libs
import {Component} from 'angular2/core';
import {Router,ROUTER_DIRECTIVES} from 'angular2/router';
import {OnInit} from "angular2/core";
import {NgClass} from 'angular2/common';
//Libs
import {ApiConnector} from "../../ApiConnector/ApiConnector";
import {Permission} from "../../Model/Permission";
import {ComponentBase} from "../ComponentBase"
@Component({
    selector: 'sections-list',
    template: require('./List.html'),
	providers: [ApiConnector],
	directives: [ROUTER_DIRECTIVES]
})

export class PermissionsListComponent extends ComponentBase implements OnInit
{ 
	constructor (private Api: ApiConnector, private _router: Router) 
	{
		super();
	}

    errorMessage: string;
    Model: Permission[];

    ngOnInit() {
        this.Get();
	}
	
    Get() {
        this.Api.Permissions.List()
					.subscribe(
						result => {this.Model = result;},
						error => this.errorMessage = <any>error
					);
    }
	Edit(entity: Permission) {
	  let link = ['PermissionEdit', { id: entity.Id }];
	  this._router.navigate(link);
	}
	Create() {
	  let link = ['PermissionEdit', { id: 0}];
	  this._router.navigate(link);
	}
}