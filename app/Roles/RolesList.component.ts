import {Component} from 'angular2/core';
import {RolesService} from "./Roles.service";
import { Router } from 'angular2/router';
import {OnInit} from "angular2/core";
import {Role} from "../Classes/Role";
@Component({
    selector: 'roles-list',
    template: `
<div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="x_panel ">  
	<button class="btn btn-default" (click)="gotoCreate()">Добавить</button>		
	<table class="table table-bordered table-striped">
	<thead>
	<tr><th>Id</th><th>Название</th></tr>
	</thead>
	<tbody>
	<tr *ngFor="#role of roles" (click)="gotoEdit(role)"><td>{{role.Id}}</td><td>{{role.Name}}</td></tr>
	</tbody>
	</table>
	</div></div></div>
    `,
	providers: [RolesService]
})

export class RolesListComponent implements OnInit
{ 
	constructor (private _rolesService: RolesService, private _router: Router) {}

    errorMessage: string;
    roles: Role[];

    ngOnInit() {
        this.getRoles();
    }
    //обращаемся к созданному нами сервису
    getRoles() {
        this._rolesService.getRoles()
                                .subscribe(
                                    roles => {this.roles = roles;},
                                    error => this.errorMessage = <any>error
                                );
    }
	gotoEdit(role: Role) {
	  let link = ['RoleEdit', { id: role.Id }];
	  this._router.navigate(link);
	}
	gotoCreate() {
	  let link = ['RoleEdit', { id: 0}];
	  this._router.navigate(link);
	}
}