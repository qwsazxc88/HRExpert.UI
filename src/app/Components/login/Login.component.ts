//Vendor libs
import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {Http, Headers, RequestOptions, Response} from "angular2/http";
//Libs
import {ApiConnector} from "../../ApiConnector/ApiConnector";
import {Login} from "../../Model/Login";

@Component({
	template: require('./Login.html'),
    selector: 'login',
	providers: [ApiConnector]
})
export class LoginComponent {
  constructor(private router: Router, private Api: ApiConnector) {
  this.Model = new Login();
  }
	jwt:string;
	errorMessage:string;
	Model:Login;
  submit() {    
    this.Api.Login.login(this.Model).subscribe(
                                    jwt => {
									this.jwt = jwt; 
									localStorage.setItem('jwt', jwt);
									let link = ['Index'];
									this.router.navigate(link);									
									},
                                    error => this.errorMessage = <any>error
                                );;
  }
}