//Vendor libs
import {Component} from 'angular2/core';
import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
//Libs
import {RolesService} from "./Roles.service";
import {UsersService} from "./Users.service";
import {LoginService} from "./Login.service";
import {SectionsService} from "./Sections.service";
@Injectable()
export class ApiConnector
{
		public Users : UsersService;
		public Roles : RolesService;		
		public Login : LoginService;
		public Sections : SectionsService;
		
	constructor
	(
	    users : UsersService,
		roles : RolesService,		
		login : LoginService,
		sections : SectionsService
	)
	{	
		this.Users = users;
		this.Roles = roles;
		this.Login = login;
		this.Sections = sections;
	}
}