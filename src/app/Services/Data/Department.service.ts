//Vendor libs
import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx'; 
//Libs
import {ApiSettings} from "../ApiSettings"
import {Department} from "../../Model";
import {HttpOptionsFactory} from "./HttpOptionsFactory"
@Injectable()
export class DepartmentsService {

    constructor (private http: Http) {}
    _organizationPath= ApiSettings.baseUrl+ApiSettings._api+ApiSettings._organization;
	//List
    
    ListByOrganization(organizationid)
    {
        var options = HttpOptionsFactory.Create();
        return this.http.get(this._organizationPath+'('+organizationid+')'+ApiSettings._departments,options)
                        .map(res => <Department[]> res.json())
                        .catch(this.handleError);
    }
	Childs(organizationid,departmentid)
	{
		var options = HttpOptionsFactory.Create();
        return this.http.get(this._organizationPath+'('+organizationid+')'+ApiSettings._departments+'('+departmentid+')'+ApiSettings._childs,options)
                        .map(res => <Department[]> res.json())
                        .catch(this.handleError);	
	}
	Read(organizationid,departmentid)
	{
		var options = HttpOptionsFactory.Create();
        return this.http.get(this._organizationPath+'('+organizationid+')'+ApiSettings._departments+'('+departmentid+')',options)
                        .map(res => <Department> res.json())
                        .catch(this.handleError);
	}
    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}