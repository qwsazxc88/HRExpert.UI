//Vendor libs
import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx'; 
//Libs
import {ApiSettings} from "./ApiSettings"
import {Permission} from "../Model/Permission";
import {HttpOptionsFactory} from "./HttpOptionsFactory"
@Injectable()
export class PermissionsService {

    constructor (private http: Http) {}

    private _list = ApiSettings.baseUrl+'/api/Permissions';
	private _create = ApiSettings.baseUrl+'/api/Permissions';
	private _read = ApiSettings.baseUrl+'/api/Permissions';
	private _update = ApiSettings.baseUrl+'/api/Permissions';
	private _delete = ApiSettings.baseUrl+'/api/Permissions';	
	//List
    List() {       
	    var options = HttpOptionsFactory.Create();
        return this.http.get(this._list,options)
                        .map(res => <Permission[]> res.json())
                        .catch(this.handleError);
    } 
	//CRUD
	Create(entity)
	{
		let body = JSON.stringify(entity);
		var options = HttpOptionsFactory.Create();
		return this.http.post(this._create,body,options)                        
                        .map(res => <Permission> res.json())
                        .catch(this.handleError);
	}
	Read(id) {
		var options = HttpOptionsFactory.Create();
        return this.http.get(this._read+'/'+id,options)
                        .map(res => <Permission> res.json())
                        .catch(this.handleError);
    }	
	Update(entity)
	{
		let body = JSON.stringify(entity);
		var options = HttpOptionsFactory.Create();
		return this.http.put(this._update,body,options)                        
                        .map(res => <Permission> res.json())
                        .catch(this.handleError);
	}
	Delete(entity)
	{
		let body = JSON.stringify(entity);
		var options = HttpOptionsFactory.Create();
		return this.http.delete(this._delete+"/"+entity.Id,options) 
						.map(res => <Permission> res.json())		
                        .catch(this.handleError);
	}
	//End of CRUD
    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}