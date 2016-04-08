//Vendor libs
import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
	template: '<a (click)="login()">Войти</a>',
    selector: 'login-menu'    
})
export class LoginMenuComponent {
  constructor(private router: Router) {
  }	
  login()
  {
    let link = ['Login'];
    this.router.navigate(link);
  }
}