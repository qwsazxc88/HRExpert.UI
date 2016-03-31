//Vendor libs
import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx'; 
//Libs
import {ApiSettings} from "./ApiSettings"
import {Role} from "../Model/Role";
import {HttpOptionsFactory} from "./HttpOptionsFactory"
@Injectable()
export class RolesService {

    constructor (private http: Http) {}

    private _list = ApiSettings.baseUrl+'/api/Roles';
	private _create = ApiSettings.baseUrl+'/api/Roles';
	private _read = ApiSettings.baseUrl+'/api/Roles';
	private _update = ApiSettings.baseUrl+'/api/Roles';
	private _delete = ApiSettings.baseUrl+'/api/Roles';	
	//List
    List() {       
	    var options = HttpOptionsFactory.Create();
		console.log(options);
        return this.http.get(this._list,options)
                        .map(res => <Role[]> res.json())
                        .catch(this.handleError);
    } 
	//CRUD
	Create(role)
	{
		let body = JSON.stringify(role);
		let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
		return this.http.post(this._create,body,options)                        
                        .map(res => <Role> res.json())
                        .catch(this.handleError);
	}
	Read(id) {
        return this.http.get(this._read+'/'+id)
                        .map(res => <Role> res.json())
                        .catch(this.handleError);
    }	
	Update(role)
	{
		let body = JSON.stringify(role);
		let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
		return this.http.put(this._update,body,options)                        
                        .map(res => <Role> res.json())
                        .catch(this.handleError);
	}
	Delete(role)
	{
		let body = JSON.stringify(role);
		let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
		return this.http.delete(this._delete+"/"+role.Id,options) 
						.map(res => <Role> res.json())		
                        .catch(this.handleError);
	}
	//End of CRUD
    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}