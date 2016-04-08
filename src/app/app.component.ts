//Vendor libs
import {Component} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';
import {NgClass} from 'angular2/common';
//Libs
import {MenuComponent} from './Components/menu/Menu.component';
import {UsersListComponent} from './Components/users/UsersList.component';
import {UserEditComponent} from './Components/users/UserEdit.component';
import {RolesListComponent} from './Components/roles/RolesList.component';
import {RoleEditComponent} from './Components/roles/RoleEdit.component';
import {SectionEditComponent} from './Components/sections/SectionEdit.component';
import {SectionsListComponent} from './Components/sections/SectionsList.component';
import {LoginComponent} from './Components/login/Login.component';
import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {UsersService} from './ApiConnector/Users.service';
import {RolesService} from './ApiConnector/Roles.service';
import {LoginService} from './ApiConnector/Login.service';
import {SectionsService} from './ApiConnector/Sections.service';
import {Home} from './Components/home';

import {AppState} from './app.service';
import {RouterActive} from './router-active';

@Component({
  selector: '[app]',
  pipes: [ ],
  providers: [ UsersService,RolesService,LoginService,SectionsService],
  directives: [ RouterActive,LoggedInRouterOutlet,MenuComponent],
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
  { path: '/sections',  name: 'Sections',  component: SectionsListComponent },
  { path: '/sections/:id',  name: 'SectionEdit',  component: SectionEditComponent },
])
export class App {
  isOn : boolean;
  toggle()
  {
    this.isOn=!this.isOn;
  }
  constructor(public appState: AppState) { this.isOn=true;}

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

