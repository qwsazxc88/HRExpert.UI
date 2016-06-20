//Vendor libs
import {Component, Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {HTTP_PROVIDERS, Http, Headers, RequestOptions, Response} from '@angular/http';

//Libs
import {
    Document, FileDto,
    User, Role, Section, Permission, Person, Department, StaffEstablishedPost, Organization, Position, Profile,
    Sicklist, SicklistBabyMindingType, SicklistPaymentPercent, SicklistPaymentRestrictType, SicklistType, TimesheetStatus
} from '../Model';
class FormDataConverter {

    private form: FormData = new FormData();
    constructor(private obj: any) {

    }
    Start(name: string) { this.GetForm(this.obj, name); return this.form; }
    private GetForm(obj, name: string) {
        var type = typeof obj;
        switch (type) {
            case 'number': this.form.append(name, obj); break;
            case 'string': this.form.append(name, obj); break;
            case 'object':
                if (obj instanceof Array) {
                    for (var i in obj) {
                        this.GetForm(obj[i], name + '[' + i + ']');
                    }
                }
                else if (obj instanceof File) {
                    this.form.append(name, obj);
                }
                else if (obj instanceof Blob) {
                    this.form.append(name, obj);
                }
                else if (obj instanceof Date) {
                    this.form.append(name, obj.toISOString());
                }
                else
                    for (var prop in obj) {
                        this.GetForm(obj[prop], name + (name.length > 0 ? '.' : '') + prop);
                    }
                break;
            default: break;
        }
    }

}
export class Resource {
    url: string;
    id: number;
    http: Http;
    parent: Resource;
    constructor(url: string) {
        this.url = url;
    }
    CreateOptions() {
        let jwt = localStorage.getItem('jwt');
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        if (jwt)
            headers.append('Authorization', 'Bearer ' + jwt);
        let options = new RequestOptions({ headers: headers });
        return options;
    }
    createAdditionUrlOptions() {
        var role = localStorage.getItem('forrole');
        
        return role ? '?for_roleid=' + role : '';
    }
    createUrl() {
        var result = (this.parent ? this.parent.createUrl() : '') + this.url + (this.id ? '(' + this.id + ')' : '');
        return result;
    }
    handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
export class ApiResource<T> extends Resource {
    url: string;
    progress;
    progressObserver;
    constructor(url: string, parent: Resource) {
        super(url);
        this.parent = parent;
        this.http = parent.http;
    }

    private makeFileRequest<T>(model: T, method: string): Observable<Response> {
        return Observable.fromPromise(new Promise<Response>((resolve,reject) => {
            var url = this.createUrl() + this.createAdditionUrlOptions();
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            var Converter = new FormDataConverter(model);
            var formData = Converter.Start('');            
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };
            /*xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                this.progressObserver.next(this.progress);
            };*/
            xhr.open(method, url, true);
            let jwt = localStorage.getItem('jwt');
            if (jwt)
                xhr.setRequestHeader('Authorization', 'Bearer ' + jwt);
            xhr.send(formData);
        }));
    }
    List() {
        var options = this.CreateOptions();
        var url = this.createUrl() + this.createAdditionUrlOptions();
        return this.http.get(url, options)
            .map(res => <T[]>res.json())
            .catch(this.handleError);
    }
    //CRUD
    Create(entity: T, IsFileSend: boolean = false) {
        //if file request
        if (IsFileSend)
            return this.makeFileRequest(entity, 'POST')
                .map(res => <T> res.json())
                .catch(this.handleError);
        //if no files provided
        let body = JSON.stringify(entity);
        var options = this.CreateOptions();
        var url = this.createUrl() + this.createAdditionUrlOptions();
        return this.http.post(url, body, options)
            .map(res => <T>res.json())
            .catch(this.handleError);
    }
    Read() {
        //console.log(url); // BUG
        var options = this.CreateOptions();
        var url = this.createUrl() + this.createAdditionUrlOptions();
        return this.http.get(url, options)
            .map(res => <T>res.json())
            .catch(this.handleError);
    }
    Update(entity: T, IsFileSend: boolean = false) {
        //if file request
        if (IsFileSend)
            return this.makeFileRequest(entity, 'PUT')
                .map(res => <T> res.json())
                .catch(this.handleError);
        //if no files provided
        let body = JSON.stringify(entity);
        var options = this.CreateOptions();
        var url = this.createUrl();
        return this.http.put(url, body, options)
            .map(res => <T>res.json())
            .catch(this.handleError);
    }
    Delete() {
        var options = this.CreateOptions();
        var url = this.createUrl() + this.createAdditionUrlOptions();
        return this.http.delete(url, options)
            .map(res => <T>res.json())
            .catch(this.handleError);
    }
}

export class UsersService extends ApiResource<User> {
    constructor(parent: Resource) {
        super('/users', parent);
    }
    public Roles = ApiFactory.RolesFactory(this);
}
export class RolesService extends ApiResource<Role> {
    constructor(parent: Resource) {
        super('/roles', parent);
    }
    public Sections = ApiFactory.SectionsFactory(this);
    public Permissions = ApiFactory.PermissionsFactory(this);
}
export class SectionsService extends ApiResource<Section> {
    constructor(parent: Resource) {
        super('/sections', parent);
    }
}
export class PermissionsService extends ApiResource<Permission> {
    constructor(parent: Resource) {
        super('/permissions', parent);
    }
}
export class DepartmentsService extends ApiResource<Department> {
    constructor(parent: Resource) {
        super('/departments', parent);
    }
    public StaffEstablishedPosts = ApiFactory.StaffEstablishedPostsFactory(this);
}
export class OrganizationsService extends ApiResource<Organization> {
    constructor(parent: Resource) {
        super('/organizations', parent);
    }
    public Departments = ApiFactory.DepartmentsFactory(this);
}
export class StaffEstablishedPostsService extends ApiResource<StaffEstablishedPost> {
    constructor(parent: Resource) {
        super('/staffestablishedposts', parent);
    }
    public Persons = ApiFactory.PersonsFactory(this);

}
export class PersonsService extends ApiResource<Person> {
    constructor(parent: Resource) {
        super('/persons', parent);
    }
}
export class PositionsService extends ApiResource<Position> {
    constructor(parent: Resource) {
        super('/positions', parent);
    }
}
export class SicklistService extends ApiResource<Document<Sicklist>> {
    constructor(parent: Resource) {
        super('/sicklists', parent);
    }
    GetFileKey(filetype) {
        //console.log(url);
        var options = this.CreateOptions();
        var url = this.createUrl() + '/files/' + filetype + this.createAdditionUrlOptions();
        return this.http.get(url, options)
            .map(res => <string>res.json())
            .catch(this.handleError);
    }
}
export class SicklistTypeService extends ApiResource<SicklistType> {
    constructor(parent: Resource) {
        super('/sicklisttypes', parent);
    }
}
export class SicklistPaymentPercentService extends ApiResource<SicklistPaymentPercent> {
    constructor(parent: Resource) {
        super('/sicklistpaymentpercents', parent);
    }
}
export class SicklistPaymentRestrictTypesService extends ApiResource<SicklistPaymentRestrictType> {
    constructor(parent: Resource) {
        super('/sicklistpaymentrestricttypes', parent);
    }
}
export class SicklistBabyMindingTypesService extends ApiResource<SicklistBabyMindingType> {
    constructor(parent: Resource) {
        super('/sicklistbabymindingtypes', parent);
    }
}
export class TimesheetStatusService extends ApiResource<TimesheetStatus> {
    constructor(parent: Resource) {
        super('/timesheetstatuses', parent);
    }
}
export class ApiFactory {
    static PersonsFactory(parent: Resource) {
        return function(Id: number = null) {
            var service = new PersonsService(parent);
            if (Id) service.id = Id;
            return service;
        };
    }
    static UsersFactory(parent: Resource) {
        return function(Id: number = null) {
            var service = new UsersService(parent);
            if (Id) service.id = Id;
            return service;
        };
    }
    static RolesFactory(parent: Resource) {
        return function(Id: number = null) {
            var service = new RolesService(parent);
            if (Id) service.id = Id;
            return service;
        };
    }
    static PermissionsFactory(parent: Resource) {
        return function(Id: number = null) {
            var service = new PermissionsService(parent);
            if (Id) service.id = Id;
            return service;
        };
    }
    static SectionsFactory(parent: Resource) {
        return function(Id: number = null) {
            var service = new SectionsService(parent);
            if (Id) service.id = Id;
            return service;
        };
    }
    static DepartmentsFactory(parent: Resource) {
        return function(Id: number = null) {
            var service = new DepartmentsService(parent);
            if (Id) service.id = Id;
            return service;
        };
    }
    static OrganizationsFactory(parent: Resource) {
        return function(Id: number = null) {
            var service = new OrganizationsService(parent);
            if (Id) service.id = Id;
            return service;
        };
    }
    static StaffEstablishedPostsFactory(parent: Resource) {
        return function(Id: number = null) {
            var service = new StaffEstablishedPostsService(parent);
            if (Id) service.id = Id;
            return service;
        };
    }
    static PositionsFactory(parent: Resource) {
        return function(Id: number = null) {
            var service = new PositionsService(parent);
            if (Id) service.id = Id;
            return service;
        };
    }
    static SicklistsFactory(parent: Resource) {
        return function(Id: number = null) {
            var service = new SicklistService(parent);
            if (Id) service.id = Id;
            return service;
        };
    }
    static SicklistTypesFactory(parent: Resource) {
        return function(Id: number = null) {
            var service = new SicklistTypeService(parent);
            if (Id) service.id = Id;
            return service;
        };
    }
    static SicklistPaymentPercentFactory(parent: Resource) {
        return function(Id: number = null) {
            var service = new SicklistPaymentPercentService(parent);
            if (Id) service.id = Id;
            return service;
        };
    }
    static SicklistPaymentRestrictTypeFactory(parent: Resource) {
        return function(Id: number = null) {
            var service = new SicklistPaymentRestrictTypesService(parent);
            if (Id) service.id = Id;
            return service;
        };
    }
    static SicklistBabyMindingTypeFactory(parent: Resource) {
        return function(Id: number = null) {
            var service = new SicklistBabyMindingTypesService(parent);
            if (Id) service.id = Id;
            return service;
        };
    }
    static TimesheetStatusFactory(parent: Resource) {
        return function(Id: number = null) {
            var service = new TimesheetStatusService(parent);
            if (Id) service.id = Id;
            return service;
        };
    }
}
@Component({ providers: [HTTP_PROVIDERS] })
@Injectable()
export class API extends Resource {
    constructor(_http: Http) {
        super('http://ruscount.com:9034/api/v1');
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
    public Sicklists = ApiFactory.SicklistsFactory(this);
    public SicklistTypes = ApiFactory.SicklistTypesFactory(this);
    public SicklistBabyMindingTypes = ApiFactory.SicklistBabyMindingTypeFactory(this);
    public SicklistPaymentPercents = ApiFactory.SicklistPaymentPercentFactory(this);
    public SicklistPaymentRestrictTypes = ApiFactory.SicklistPaymentRestrictTypeFactory(this);
    public TimesheetStatuses = ApiFactory.TimesheetStatusFactory(this);
    transformRequest(obj) {
        var str = [];
        for (var p in obj)
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        return str.join('&');
    }
    download(key) {
        window.open('http://ruscount.com:9034/download/' + key, '_blank');
    }
    login(model) {
        //console.log(this.http);
        let body = this.transformRequest({
            username: model.UserName,
            password: model.Password,
            grant_type: 'password'
        });
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://ruscount.com:9034/connect/token', body, options)
            .map(res => <string>(res.json().access_token))
            .catch(error => Observable.throw(error.json().error || 'Server error'));
    }
    profile() {
        var options = this.CreateOptions();
        var url = this.url + '/profile';
        return this.http.get(url, options)
            .map(res => <Profile>res.json())
            .catch(this.handleError);
    }
}
