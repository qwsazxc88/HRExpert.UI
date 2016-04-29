//Vendor libs
import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx'; 
//Libs
import {ApiSettings} from "../ApiSettings"
import {StaffEstablishedPost} from "../../Model";
import {HttpOptionsFactory} from "./HttpOptionsFactory"
@Injectable()
export class StaffEstablishedPostService {

    constructor (private http: Http) {}
    _organizationPath= ApiSettings.baseUrl+ApiSettings._api+ApiSettings._organization;
	//List
    
    ListByOrganizationAndDepartment(organizationid,departmentid)
    {
        var options = HttpOptionsFactory.Create();
        return this.http.get(this._organizationPath
                            +'('+organizationid+')'
                            +ApiSettings._departments
                            +'('+departmentid+')'
                            +'/staffestablishedposts'
                            ,options)
                        .map(res => <StaffEstablishedPost[]> res.json())
                        .catch(this.handleError);
    }	
	Read(organizationid,departmentid,positionid)
	{
		var options = HttpOptionsFactory.Create();
        return this.http.get(this._organizationPath
                                +'('+organizationid+')'
                                +ApiSettings._departments
                                +'('+departmentid+')'
                                +'/staffestablishedposts'
                                +'('+positionid+')'
                                ,options)
                        .map(res => <StaffEstablishedPost> res.json())
                        .catch(this.handleError);
	}
    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}