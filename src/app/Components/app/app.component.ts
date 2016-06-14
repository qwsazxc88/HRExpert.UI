//Vendor libs
import {Component, ViewContainerRef } from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';
import {NgClass} from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/Http';
import {BS_VIEW_PROVIDERS} from 'ng2-bootstrap';
//Libs
import {
    APP_COMPONENTS,
    APP_UI_COMPONENTS,
    Home,
    UsersListComponent,
    UserEditComponent,
    RolesListComponent,
    RoleEditComponent,
    SectionsListComponent,
    SectionEditComponent,
    PermissionsListComponent,
    PermissionEditComponent,
    OrganizationListComponent,
    OrganizationEditComponent,
    DepartmentsListComponent,
    DepartmentEditComponent,
    PersonsListComponent,
    StaffEstablishedPostEditComponent,
    StaffEstablishedPostListComponent,
    SicklistEditComponent,
    SicklistListComponent
  } from '../';
import {MD_COMPONENTS} from '../MD_COMPONENTS';
import {API} from '../../Services';
import {Profile} from '../../Model';

@Component({
  selector: '[app]',
  pipes: [ ],
  providers: [HTTP_PROVIDERS,API,BS_VIEW_PROVIDERS],
  directives: [MD_COMPONENTS, APP_COMPONENTS, APP_UI_COMPONENTS],
  styles: [require('../../Views/app/app.css')],
  template: require('../../Views/app/app.html')
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
  { path: '/organizations/:organizationid',  name: 'OrganizationEdit',  component: OrganizationEditComponent },
  { path: '/organizations/:organizationid/departments/:departmentid',  name: 'DepartmentEdit',  component: DepartmentEditComponent }  ,
  { path: '/organizations/:organizationid/departments/:departmentid/staffestablishedpost/:positionid',  name: 'StaffEstablishedPostEdit',  component: StaffEstablishedPostEditComponent },
  { path: '/sicklists',  name: 'Sicklists',  component: SicklistListComponent },
  { path: '/sicklists/:id',  name: 'SicklistEdit',  component: SicklistEditComponent }
  
])
export class App {
  jwt : string;
  decodedJwt : any;
  profile : Profile;
  currentRole : number;
  constructor(private viewContainerRef:ViewContainerRef) { 
    //this.viewContainerRef = viewContainerRef;
      let token = localStorage.getItem('jwt');
      if(token)
      {
          this.jwt = token;
      }
    }

  ngOnInit() {    
  }

}

