import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {UsersService} from "./Users.service";
import {OnInit} from "angular2/core";
import {User} from "../Classes/User";
@Component({
    selector: 'users-list',
    template: `   
<div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="x_panel ">	
		<button class="btn btn-default" (click)="gotoCreate()">Добавить</button>
	<table class="table table-bordered table-striped">
	<thead>
	<tr><th>Id</th><th>Имя</th></tr>
	</thead>
	<tbody>
	<tr *ngFor="#user of users" (click)="gotoEdit(user)"><td>{{user.Id}}</td><td>{{user.Name}}</td></tr>
	</tbody>
	</table>
	</div></div></div>
    `,
	providers: [UsersService]
})

export class UsersListComponent implements OnInit
{ 
	constructor (private _usersService: UsersService,private _router: Router) {}

    errorMessage: string;
    users: User[];

    ngOnInit() {
        this.getUsers();
    }
    //обращаемся к созданному нами сервису
    getUsers() {
        this._usersService.getUsers()
                                .subscribe(
                                    users => {this.users = users; },
                                    error => this.errorMessage = <any>error
                                );
    }
	gotoEdit(user: User) {
	  let link = ['UserEdit', { id: user.Id }];
	  this._router.navigate(link);
	}
	gotoCreate() {
	  let link = ['UserEdit', { id: 0}];
	  this._router.navigate(link);
	}
}