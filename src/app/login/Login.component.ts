import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import {LoginService} from "./Login.service"
@Component({
	template: require('./Login.html'),
    selector: 'login',
	providers: [LoginService]
})
export class LoginComponent {
  constructor(private router: Router, private loginService: LoginService) {
  }
	jwt:string;
	errorMessage:string;
	username:string;
	password:string;
  submit() {    
    this.loginService.login(this.username,this.password).subscribe(
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