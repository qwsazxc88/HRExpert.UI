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
import {PermissionEditComponent} from './Components/permissions/PermissionEdit.component';
import {PermissionsListComponent} from './Components/permissions/PermissionsList.component';
import {LoginComponent} from './Components/login/Login.component';
import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {UsersService} from './ApiConnector/Users.service';
import {RolesService} from './ApiConnector/Roles.service';
import {LoginService} from './ApiConnector/Login.service';
import {SectionsService} from './ApiConnector/Sections.service';
import {PermissionsService} from './ApiConnector/Permissions.service';
import {Home} from './Components/home';
import {Profile} from './Model/Profile';
import {AppState} from './app.service';
import {RouterActive} from './router-active';

@Component({
  selector: '[app]',
  pipes: [ ],
  providers: [ UsersService,RolesService,LoginService,SectionsService,PermissionsService],
  directives: [ RouterActive,LoggedInRouterOutlet,MenuComponent,LoginComponent],
  styles: [],
  template: require('./app.html')
})
@RouteConfig([
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/users',  name: 'Users',  component: UsersListComponent },
  { path: '/users/:id',  name: 'UserEdit',  component: UserEditComponent },
  { path: '/roles',  name: 'Roles',  component: RolesListComponent },
  { path: '/roles/:id',  name: 'RoleEdit',  component: RoleEditComponent },
  { path: '/sections',  name: 'Sections',  component: SectionsListComponent },
  { path: '/sections/:id',  name: 'SectionEdit',  component: SectionEditComponent },
  { path: '/permissions',  name: 'Permissions',  component: PermissionsListComponent },
  { path: '/permissions/:id',  name: 'PermissionEdit',  component: PermissionEditComponent },
])
export class App {
  jwt : string;
  decodedJwt :any ;
  isOn : boolean;
  profile : Profile;
  toggle()
  {
    this.isOn=!this.isOn;
  }
  constructor(public appState: AppState) { 
      this.isOn=true;
      let token = localStorage.getItem('jwt');
      if(token)
      {
          this.jwt = token;
      }
    }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

