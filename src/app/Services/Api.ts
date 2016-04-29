//Vendor libs
import {Component} from 'angular2/core';
import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
//Libs
import {
    APP_PROVIDERS,
    OrganizationService,
    RolesService, 
    DepartmentsService,
    UsersService, 
    LoginService, 
    SectionsService, 
    PermissionsService,
    StaffEstablishedPostService,
    PositionsService,
    PersonsService
} from "./Data";

@Injectable()
export class API
{
	constructor
	(
	    public Users : UsersService,
		public Roles : RolesService,		
		public Login : LoginService,
		public Sections : SectionsService,
		public Permissions : PermissionsService,
        public Departments : DepartmentsService,
        public Organizations : OrganizationService,
        public StaffEstablishedPosts : StaffEstablishedPostService,
        public Persons: PersonsService,
        public Positions: PositionsService
	)
	{	
	}
}