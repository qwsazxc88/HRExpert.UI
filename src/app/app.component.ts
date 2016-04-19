//Vendor libs
import {Component} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';
import {NgClass} from 'angular2/common';
import {MdButton, MdAnchor} from '@angular2-material/button';
import {MdToolbar} from '@angular2-material/toolbar';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdRadioButton,MdRadioChange,MdRadioDispatcher,MdRadioGroup} from '@angular2-material/radio';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';

import {MD_LIST_DIRECTIVES} from '@angular2-material/list';


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
import {OrganizationEditComponent} from './Components/organizations/OrganizationEdit.component';
import {OrganizationListComponent} from './Components/organizations/OrganizationsList.component';
import {DepartmentsListComponent} from './Components/departments/DepartmentsList.component';
import {LoginComponent} from './Components/login/Login.component';
import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {UsersService} from './ApiConnector/Users.service';
import {RolesService} from './ApiConnector/Roles.service';
import {LoginService} from './ApiConnector/Login.service';
import {SectionsService} from './ApiConnector/Sections.service';
import {PermissionsService} from './ApiConnector/Permissions.service';
import {DepartmentsService} from './ApiConnector/Department.service';
import {OrganizationService} from './ApiConnector/Organization.service';
import {Home} from './Components/home';
import {Profile} from './Model/Profile';
import {AppState} from './app.service';
import {RouterActive} from './router-active';

@Component({
  selector: '[app]',
  pipes: [ ],
  providers: [ UsersService,RolesService,LoginService,SectionsService,PermissionsService,DepartmentsService,OrganizationService],
  directives: [ RouterActive,LoggedInRouterOutlet,MenuComponent,LoginComponent,DepartmentsListComponent,MdButton,MD_SIDENAV_DIRECTIVES,MD_INPUT_DIRECTIVES,MD_LIST_DIRECTIVES,MdToolbar],
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
  { path: '/organizations',  name: 'Organizations',  component: OrganizationListComponent },
  { path: '/organizations/:id',  name: 'OrganizationEdit',  component: OrganizationEditComponent },
  { path: '/departments',  name: 'Departments',  component: DepartmentsListComponent },
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

