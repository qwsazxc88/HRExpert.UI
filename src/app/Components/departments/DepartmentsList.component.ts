//Vendor libs
import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {OnInit, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';
//Libs
import {API} from '../../Services';
import {MD_COMPONENTS} from '../MD_COMPONENTS';
import {APP_UI_COMPONENTS} from '../APP_UI_COMPONENTS';
import {Department} from '../../Model';

@Component({
    selector: 'departments-list',
    template: require('../../Views/departments/List.html'),
    providers: [API],
    directives: [ROUTER_DIRECTIVES, APP_UI_COMPONENTS, MD_COMPONENTS]
})

export class DepartmentsListComponent implements OnInit {
    constructor (private Api: API, private _router: Router) {
    }
    @Input() Organization: number;
    errorMessage: string;
    Model: Department[];
    SelectedDepartment: Department;
    ngOnInit() {
        this.Get();
    }
    Get() {
        if (this.Organization && this.Organization > 0)
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