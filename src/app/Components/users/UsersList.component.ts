//Vendor libs
import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {OnInit} from "angular2/core";
//Libs
import {ApiConnector} from "../../ApiConnector";
import {User} from "../../Model/User";

@Component({
    selector: 'users-list',
    template: require('./List.html'),
	providers: [ApiConnector]
})

export class UsersListComponent implements OnInit
{ 
	constructor (private Api: ApiConnector,private _router: Router) {}

    errorMessage: string;
    Model: User[];

    ngOnInit() {
        this.Get();
    }
    //обращаемся к созданному нами сервису
    Get() {
        this.Api.Users.List()
                                .subscribe(
                                    users => {this.Model = users; },
                                    error => this.errorMessage = <any>error
                                );
    }
	Edit(user: User) {
	  let link = ['UserEdit', { id: user.Id }];
	  this._router.navigate(link);
	}
	Create() {
	  let link = ['UserEdit', { id: 0}];
	  this._router.navigate(link);
	}	
}