//Vendor libs
import {Component} from 'angular2/core';
import {Router,ROUTER_DIRECTIVES} from 'angular2/router';
import {OnInit} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {MdButton, MdAnchor} from '@angular2-material/button';
import {MdToolbar} from '@angular2-material/toolbar';
//Libs
import {API} from '../../Services';
import {Permission} from '../../Model';
import {MD_COMPONENTS} from '../';
@Component({
    selector: 'sections-list',
    template: require('../../Views/permissions/List.html'),
	providers: [API],
	directives: [ROUTER_DIRECTIVES,MD_COMPONENTS]
})

export class PermissionsListComponent implements OnInit
{ 
	constructor (private Api: API, private _router: Router) 
	{
	}

    errorMessage: string;
    Model: Permission[];

    ngOnInit() {
        this.Get();
	}
	
    Get() {
        this.Api.Permissions().List()
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