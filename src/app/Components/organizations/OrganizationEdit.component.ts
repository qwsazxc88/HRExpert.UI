//Vendor libs
import {Component,OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';

//Libs
import {API} from '../../Services';
import {Organization,Department} from '../../Model';
import {MD_COMPONENTS} from '../MD_COMPONENTS';
import {DepartmentsListComponent} from '../departments/DepartmentsList.component';
@Component({
    selector: 'organization-edit',
    template: require('../../Views/organizations/Edit.html'),
    directives: [DepartmentsListComponent, MD_COMPONENTS],
	providers: [API]
})

export class OrganizationEditComponent implements OnInit
{ 
	constructor (private Api: API, private _routeParams: RouteParams) 
	{
		this.Model=new Organization(0,'');  
        let id =+this._routeParams.get('organizationid');
		if(id>0)
		{
            this.Model.Id=id;
			this.Get(id);
		}      
	}

    errorMessage: string;
    Model: Organization;
    Departments: Department[];
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
		this.Api.Departments.ListByOrganization(id)
			.subscribe(
				result => {this.Departments = result; },
				error => this.errorMessage = <any>error
			);
    }
}