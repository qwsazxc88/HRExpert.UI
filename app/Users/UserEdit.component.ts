import {Component,Input} from 'angular2/core';
import {UsersService} from "./Users.service";
import {RouteParams} from 'angular2/router';
import {OnInit} from "angular2/core";
import {User} from "../Classes/User";
@Component({
    selector: 'users-edit',
    template: `<div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="x_panel ">	  
	<div *ngIf="user">
	<div class="form-group">
	  <label>Id:</label>
	  <span>{{user.Id}}</span>
	</div>	
	<div class="form-group">
	  <label>Имя:</label>
	  <input type="text" class="form-control" [(ngModel)]="user.Name" placeholder="name">
	</div>
	</div>
	<button class="btn btn-default" (click)="saveUser()">Сохранить</button>
	</div></div></div>
    `,
	providers: [UsersService]
})

export class UserEditComponent implements OnInit
{ 
	constructor (private _usersService: UsersService, private _routeParams: RouteParams) {}

    errorMessage: string;
    @Input user: User;

    ngOnInit() {
		let id = this._routeParams.get('id');
		if(id>0)
		{
			this.getUser(id);
		}
		else
		{
			this.user=new User();
			this.user.Id=0;
		}
    }
	saveUser()
	{
		var data = this.user;
		if(this.user.Id>0)
		{
			this._usersService.editUser(data)
                                .subscribe(
                                    user => {this.user = user; },
                                    error => this.errorMessage = <any>error
                                );
		}
		else
		{
			this._usersService.createUser(data)
                                .subscribe(
                                    user => {this.user = user; },
                                    error => this.errorMessage = <any>error
                                );
		}
	}
    //обращаемся к созданному нами сервису
    getUser(id) {
        this._usersService.getUser(id)
                                .subscribe(
                                    user => {this.user = user; },
                                    error => this.errorMessage = <any>error
                                );
    }
}