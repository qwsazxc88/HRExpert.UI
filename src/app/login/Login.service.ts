import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class LoginService {

    constructor (private http: Http) {}

    private _login = 'http://localhost:60729/connect/token';
   
   transformRequest(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    }
   
   login(_login,_password)
	{
		let body = this.transformRequest({username:_login,password:_password,'grant_type':'password'});
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
		return this.http.post(this._login,body,options)                        
                        .map(res => <string> res.json())
                        .catch(this.handleError);
	}	
	
    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}