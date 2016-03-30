import {Component} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';
import {UsersListComponent} from './users/UsersList.component';
import {UserEditComponent} from './users/UserEdit.component';
import {RolesListComponent} from './roles/RolesList.component';
import {RoleEditComponent} from './roles/RoleEdit.component';
import {LoginComponent} from './login/Login.component';
import {Home} from './home';
import {AppState} from './app.service';
import {RouterActive} from './router-active';

@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterActive ],
  styles: [],
  template: require('./app.html')
})
@RouteConfig([
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/users',  name: 'Users',  component: UsersListComponent },
  { path: '/users/:id',  name: 'UserEdit',  component: UserEditComponent },
  { path: '/roles',  name: 'Roles',  component: RolesListComponent },
  { path: '/roles/:id',  name: 'RoleEdit',  component: RoleEditComponent },
  { path: '/login',  name: 'Login',  component: LoginComponent },
])
export class App {
  constructor(public appState: AppState) {}

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

