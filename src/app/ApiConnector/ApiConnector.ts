//Vendor libs
import {Component} from 'angular2/core';
import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
//Libs
import {RolesService} from "./Roles.service";
import {UsersService} from "./Users.service";
import {LoginService} from "./Login.service";

@Injectable()
export class ApiConnector
{
		public Users : UsersService;
		public Roles : RolesService;		
		public Login : LoginService;
	constructor
	(
	    users : UsersService,
		roles : RolesService,		
		login : LoginService
	)
	{	
		this.Users = users;
		this.Roles = roles;
		this.Login = login;
	}
}