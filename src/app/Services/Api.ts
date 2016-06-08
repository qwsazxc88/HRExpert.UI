//Vendor libs
import {Component, Injectable} from 'angular2/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {HTTP_PROVIDERS, Http , Headers, RequestOptions, Response} from "angular2/http";
//Libs
import {
    User, Role, Section, Permission, Person, Department, StaffEstablishedPost, Organization, Position, Profile
} from "../Model";
export class Resource{
    url: string;
    id: number;
    http: Http;
    parent: Resource;
    constructor(url:string)
    {
        this.url = url;
    }
    CreateOptions()
	{
		let jwt = localStorage.getItem('jwt');
		let headers = new Headers({ 'Content-Type': 'application/json','Accept': 'application/json' });		
		if(jwt)
			headers.append("Authorization","Bearer " +jwt);
        let options = new RequestOptions({ headers: headers });
		return options;
	}
    createAdditionUrlOptions()
    {
        var role = localStorage.getItem("forrole");
        console.log(role);
        return role?"?for_roleid="+role:"";
    }
    createUrl()
    {
        var result = (this.parent? this.parent.createUrl():"") +  this.url + (this.id?"("+this.id+")":"");             
        return result;
    }
    handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    
}
export class ApiResource<T> extends Resource
{
    url: string;
    
    constructor(url:string, parent: Resource)
    {
        super(url);
        this.parent = parent;
        this.http = parent.http;
    }    
    
    List() {
        var options = this.CreateOptions();
        var url = this.createUrl()+this.createAdditionUrlOptions();
        console.log(url);
        return this.http.get(url, options)
                        .map(res =>  <T[]> res.json())
                        .catch(this.handleError);
    }
	//CRUD
    Create(entity: T) {
        let body = JSON.stringify(entity);
        var options = this.CreateOptions();
        var url = this.createUrl()+this.createAdditionUrlOptions();
        return this.http.post(url, body, options)
                        .map(res => <T> res.json())
                        .catch(this.handleError);
    }
    Read() {
        console.log(url);
        var options = this.CreateOptions();
        var url = this.createUrl()+this.createAdditionUrlOptions();
        return this.http.get(url, options)
                        .map(res =>  <T> res.json())
                        .catch(this.handleError);
    }
    Update(entity: T)
    {
        let body = JSON.stringify(entity);
        var options = this.CreateOptions();
        var url = this.createUrl();
        return this.http.put(url, body, options)
                        .map(res => <T> res.json())
                        .catch(this.handleError);
    }
    Delete()
    {
        var options = this.CreateOptions();
        var url = this.createUrl()+this.createAdditionUrlOptions();
        return this.http.delete(url, options)
                .map(res => <T> res.json())
                        .catch(this.handleError);
    }
}
export class UsersService extends ApiResource<User>{
    constructor(parent: Resource)
    {
        super("/users",parent)
    }
    public Roles = ApiFactory.RolesFactory(this);
}
export class RolesService extends ApiResource<Role>{
    constructor(parent: Resource)
    {
        super("/roles",parent)
    }
    public Sections = ApiFactory.SectionsFactory(this);
    public Permissions = ApiFactory.PermissionsFactory(this);
}
export class SectionsService extends ApiResource<Section>{
    constructor(parent: Resource)
    {
        super("/sections",parent)
    }
}
export class PermissionsService extends ApiResource<Permission>{
    constructor(parent: Resource)
    {
        super("/permissions",parent)
    }
}
export class DepartmentsService extends ApiResource<Department>{
    constructor(parent: Resource)
    {
        super("/departments",parent)
    }
    public StaffEstablishedPosts= ApiFactory.StaffEstablishedPostsFactory(this);
}
export class OrganizationsService extends ApiResource<Organization>{
    constructor(parent: Resource)
    {
        super("/organizations",parent)
    }
    public Departments= ApiFactory.DepartmentsFactory(this);
}
export class StaffEstablishedPostsService extends ApiResource<StaffEstablishedPost>{
    constructor(parent: Resource)
    {
        super("/staffestablishedposts",parent)
    }
    public Persons = ApiFactory.PersonsFactory(this);
    
}
export class PersonsService extends ApiResource<Person>{
    constructor(parent: Resource)
    {
        super("/persons",parent)
    }
}
export class PositionsService extends ApiResource<Position>{
    constructor(parent: Resource)
    {
        super("/positions",parent)
    }
}
export class ApiFactory
{
    static PersonsFactory(parent: Resource) 
    {
        return function(Id:number = null)
        { 
            var service = new PersonsService(parent);
            if(Id) service.id=Id; 
            return service;
        }
    }
    static UsersFactory(parent: Resource) 
    {
        return function(Id:number = null)
        { 
            var service = new UsersService(parent);
            if(Id) service.id=Id; 
            return service;
        }
    }
    static RolesFactory(parent: Resource) 
    {
        return function(Id:number = null)
        { 
            var service = new RolesService(parent);
            if(Id) service.id=Id; 
            return service;
        }
    }
    static PermissionsFactory(parent: Resource) 
    {
        return function(Id:number = null)
        { 
            var service = new PermissionsService(parent);
            if(Id) service.id=Id; 
            return service;
        }
    }
    static SectionsFactory(parent: Resource) 
    {
        return function(Id:number = null)
        { 
            var service = new SectionsService(parent);
            if(Id) service.id=Id; 
            return service;
        }
    }
    static DepartmentsFactory(parent: Resource) 
    {
        return function(Id:number = null)
        { 
            var service = new DepartmentsService(parent);
            if(Id) service.id=Id; 
            return service;
        }
    }
    static OrganizationsFactory(parent: Resource) 
    {
        return function(Id:number = null)
        { 
            var service = new OrganizationsService(parent);
            if(Id) service.id=Id; 
            return service;
        }
    }
    static StaffEstablishedPostsFactory(parent: Resource) 
    {
        return function(Id:number = null)
        { 
            var service = new StaffEstablishedPostsService(parent);
            if(Id) service.id=Id; 
            return service;
        }
    }
    static PositionsFactory(parent: Resource) 
    {
        return function(Id:number = null)
        { 
            var service = new PositionsService(parent);
            if(Id) service.id=Id; 
            return service;
        }
    }
}
@Component({providers:[HTTP_PROVIDERS]})
@Injectable()
export class API extends Resource
{
	constructor	(_http: Http)
	{	
        super("http://ruscount.com:9034/api/v1");
        this.http = _http;
	}
    public Users = ApiFactory.UsersFactory(this);
    public Roles = ApiFactory.RolesFactory(this);
    public Sections = ApiFactory.SectionsFactory(this);
    public Permissions = ApiFactory.PermissionsFactory(this);
    public Departments = ApiFactory.DepartmentsFactory(this);
    public Organizations = ApiFactory.OrganizationsFactory(this);
    public StaffEstablishedPosts = ApiFactory.StaffEstablishedPostsFactory(this);
    public Persons = ApiFactory.PersonsFactory(this);
    public Positions = ApiFactory.PositionsFactory(this);
   transformRequest(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    }
   login(model)
	{
        console.log(this.http);
		let body = this.transformRequest({
			username: model.UserName,
			password: model.Password,
			grant_type:'password'});
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
		return this.http.post("http://ruscount.com:9034/connect/token",body,options)                        
                        .map(res => <string> (res.json().access_token))
                        .catch(error=>Observable.throw(error.json().error || 'Server error'));
	}	
    profile()
    {
        var options = this.CreateOptions();
        var url = this.url + "/profile";
        return this.http.get(url, options)
                        .map(res => <Profile> res.json())
                        .catch(this.handleError);
    }
}
