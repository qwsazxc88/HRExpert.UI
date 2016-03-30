import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx'; 
import {Role} from "./Role";

@Injectable()
export class RolesService {

    constructor (private http: Http) {}

    private _getRoles = 'http://localhost:60729/api/Roles';
	private _createRoles = 'http://localhost:60729/api/Roles';
	private _editRoles = 'http://localhost:60729/api/Roles';

   getRoles() {
        //обращаемся к API через get
        return this.http.get(this._getRoles)
                        .map(res => <Role[]> res.json())
                        .catch(this.handleError);
    } 
	getRole(id) {
        return this.http.get(this._getRoles+'/'+id)
                        .map(res => <Role> res.json())
                        .catch(this.handleError);
    } 	
	createRole(role)
	{
		let body = JSON.stringify(role);
		let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
		return this.http.post(this._createRoles,body,options)                        
                        .map(res => <Role> res.json())
                        .catch(this.handleError);
	}
	editRole(role)
	{
		let body = JSON.stringify(role);
		let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
		return this.http.put(this._editRoles,body,options)                        
                        .map(res => <Role> res.json())
                        .catch(this.handleError);
	}
    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}