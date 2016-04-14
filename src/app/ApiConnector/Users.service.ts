//Vendor libs
import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
//Libs
import {ApiSettings} from "./ApiSettings"
import {User} from "../Model/User";
import {Profile} from "../Model/Profile";
import {HttpOptionsFactory} from "./HttpOptionsFactory"

@Injectable()
export class UsersService {

    constructor (private http: Http) {}
    //Constants
    private _list = ApiSettings.baseUrl+'/api/Users';
	private _create = ApiSettings.baseUrl+'/api/Users';
	private _read = ApiSettings.baseUrl+'/api/Users';
	private _update = ApiSettings.baseUrl+'/api/Users';
	private _delete = ApiSettings.baseUrl+'/api/Users';
    private _profile = ApiSettings.baseUrl+'/api/Profile';
    Profile()
    {
        var options = HttpOptionsFactory.Create();
        return this.http.get(this._profile,options)
                        .map(res => <Profile> res.json())
                        .catch(this.handleError);
    }
    //List
    List() {
		var options = HttpOptionsFactory.Create();
        return this.http.get(this._list,options)
                        .map(res => <User[]> res.json())
                        .catch(this.handleError);
    }    
	//CRUD
	Create(user)
	{
		let body = JSON.stringify(user);
        var options = HttpOptionsFactory.Create();
		return this.http.post(this._create,body,options)                        
                        .map(res => <User> res.json())
                        .catch(this.handleError);
	}
	Read(id) {
		var options = HttpOptionsFactory.Create();
        return this.http.get(this._read+'/'+id,options)
                        .map(res => <User> res.json())
                        .catch(this.handleError);
    }
	Update(user)
	{
		let body = JSON.stringify(user);
        var options = HttpOptionsFactory.Create();
		return this.http.put(this._update,body,options)                        
                        .map(res => <User> res.json())
                        .catch(this.handleError);
	}
	Delete(user)
	{
		let body = JSON.stringify(user);
        var options = HttpOptionsFactory.Create();
		return this.http.delete(this._delete+"/"+user.Id,options)
						.map(res => <User> res.json())
                        .catch(this.handleError);
	}
	//End of CRUD
	
    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}