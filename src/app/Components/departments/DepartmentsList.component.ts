//Vendor libs
import {Component} from 'angular2/core';
import {Router,ROUTER_DIRECTIVES} from 'angular2/router';
import {OnInit, Input} from "angular2/core";
import {NgClass} from 'angular2/common';
//Libs
import {ApiConnector} from "../../ApiConnector/ApiConnector";
import {Department} from "../../Model/Department";
import {ComponentBase} from "../ComponentBase";
import {TreeView} from "../TreeView/TreeView.component";
@Component({
    selector: 'departments-list',
    template: require('./List.html'),
	providers: [ApiConnector],
	directives: [ROUTER_DIRECTIVES, TreeView]
})

export class DepartmentsListComponent extends ComponentBase implements OnInit
{ 
	constructor (private Api: ApiConnector, private _router: Router) 
	{
		super();
	}
    @Input() Organization:number;
    errorMessage: string;
    Model: Department[];
    SelectedDepartment: Department;
    ngOnInit() {
        this.Get();
	}
	
    Get() {
        if(this.Organization && this.Organization>0)
        this.Api.Departments.ListByOrganization(this.Organization)
					.subscribe(
						data => {this.Model = data;},
						error => this.errorMessage = <any>error
					);
    }
	Edit(entity: Department) {
	  let link = ['DepartmentEdit', { id: entity.Id }];
	  this._router.navigate(link);
	}
	Create() {
	  let link = ['DepartmentEdit', { id: 0}];
	  this._router.navigate(link);
	}
}