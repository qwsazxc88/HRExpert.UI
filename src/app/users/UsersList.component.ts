import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {UsersService} from "./Users.service";
import {OnInit} from "angular2/core";
import {User} from "./User";
@Component({
    selector: 'users-list',
    template: require('./List.html'),
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