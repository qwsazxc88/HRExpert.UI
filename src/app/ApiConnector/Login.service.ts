//Vendor libs
import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
//Libs
import {ApiSettings} from "./ApiSettings"
import {Login} from "../Model/Login";

@Injectable()
export class LoginService {

    constructor (private http: Http) {}

    private _login = ApiSettings.baseUrl+'/connect/token';
   
   transformRequest(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    }
   
   login(model)
	{
		let body = this.transformRequest({
			username: model.UserName,
			password: model.Password,
			grant_type:'password'});
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
		return this.http.post(this._login,body,options)                        
                        .map(res => <string> (res.json().access_token))
                        .catch(this.handleError);
	}	
	
    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}