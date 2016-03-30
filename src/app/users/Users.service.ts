import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx'; //без этого импорта у нас любое общение с API будет заканчиваться ошибками. Временная фича, которую обещают найти и устранить
import {User} from "./User";

//@Injectable - декоратор, который передает данные о нашем сервисе.
@Injectable()
export class UsersService {

    constructor (private http: Http) {}

    //так как у меня по разным ссылкам запрос и отправка данных, то я сделала 2 переменные с их указанием. Если вдруг что поменяется в ссылках, то мне не надо будет разыскивать по всему документу :) Удобно
    private _getUsers = 'http://localhost:60729/api/Users';
	private _createUsers = 'http://localhost:60729/api/Users';
	private _editUsers = 'http://localhost:60729/api/Users';
   //запрашиваем всех юзеров 
   getUsers() {
        //обращаемся к API через get
        return this.http.get(this._getUsers)
                        //тут мы принимаем событие и возвращаем некоторые данные. В нашем случае - массив категорий в json формате
                        .map(res => <User[]> res.json())
                        .catch(this.handleError);
    }    
	getUser(id) {
        //обращаемся к API через get
        return this.http.get(this._getUsers+'/'+id)
                        //тут мы принимаем событие и возвращаем некоторые данные. В нашем случае - массив категорий в json формате
                        .map(res => <User> res.json())
                        .catch(this.handleError);
    } 
	createUser(user)
	{
		console.log(user);
		let body = JSON.stringify(user);
		//устанавливаем нужный нам заголовок
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
		return this.http.post(this._createUsers,body,options)                        
                        .map(res => <User> res.json())
                        .catch(this.handleError);
	}
	editUser(user)
	{
		let body = JSON.stringify(user);
		//устанавливаем нужный нам заголовок
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
		return this.http.put(this._createUsers,body,options)                        
                        .map(res => <User> res.json())
                        .catch(this.handleError);
	}
    private handleError (error: Response) {
        //in a real world app, we may send the error to some remote logging infrastructure
        //instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}