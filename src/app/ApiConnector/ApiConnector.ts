//Vendor libs
import {Component} from 'angular2/core';
import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
//Libs
import {RolesService} from "./Roles.service";
import {DepartmentsService} from "./Department.service";
import {OrganizationService} from "./Organization.service";
import {UsersService} from "./Users.service";
import {LoginService} from "./Login.service";
import {SectionsService} from "./Sections.service";
import {PermissionsService} from './Permissions.service';
@Injectable()
export class ApiConnector
{
		
	constructor
	(
	    public Users : UsersService,
		public Roles : RolesService,		
		public Login : LoginService,
		public Sections : SectionsService,
		public Permissions : PermissionsService,
        public Departments : DepartmentsService,
        public Organizations : OrganizationService
	)
	{	
	}
}