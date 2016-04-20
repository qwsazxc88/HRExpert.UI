//Vendor libs
import {Component,OnInit} from 'angular2/core';
import {Router,ROUTER_DIRECTIVES} from 'angular2/router';
//Libs
import {MD_COMPONENTS} from '../MD_COMPONENTS';
import {API} from '../../Services';
import {Organization} from '../../Model';
@Component({
    selector: 'organization-list',
    template: require('../../Views/organizations/List.html'),
	providers: [API],
	directives: [ROUTER_DIRECTIVES, MD_COMPONENTS]
})

export class OrganizationListComponent implements OnInit
{ 
	constructor (private Api: API, private _router: Router) 
	{
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