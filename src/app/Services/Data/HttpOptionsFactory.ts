import {Http, Headers, RequestOptions, Response} from "angular2/http";
export class HttpOptionsFactory {

	static Create()
	{
		let jwt = localStorage.getItem('jwt');
		let headers = new Headers({ 'Content-Type': 'application/json','Accept': 'application/json' });		
		if(jwt)
			headers.append("Authorization","Bearer " +jwt);
        let options = new RequestOptions({ headers: headers });
		return options;
	}
}