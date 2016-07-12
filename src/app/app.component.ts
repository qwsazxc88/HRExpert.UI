// Vendor libs
import { Component, ViewContainerRef } from '@angular/core';
// import { RouteConfig, Router } from '@angular/router-deprecated';

// import { HTTP_PROVIDERS } from '@angular/http';
// import { BS_VIEW_PROVIDERS } from 'ng2-bootstrap';
// Libs
import {
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
    // DepartmentsListComponent,
    DepartmentEditComponent,
    // PersonsListComponent,
    // StaffEstablishedPostEditComponent,
    // StaffEstablishedPostListComponent,
    SicklistEditComponent,
    SicklistListComponent
} from './';
import { LoginComponent } from './login/Login.component';
import { MenuComponent } from './menu/Menu.component';
import { LoggedInRouterOutlet } from './UI/CustomRouter/LoggedInOutlet';

// import { API } from '../Services';
import { Profile } from './Model';
import { AppState } from './app.service';

@Component({
    selector: 'hre-app',
    pipes: [],
    // providers: [API],
    directives: [LoginComponent, MenuComponent, LoggedInRouterOutlet],
    styles: [require('./app.css')],
    template: require('./app.html')
})
@RouteConfig([
    { path: '/', name: 'Index', component: Home, useAsDefault: true },
    { path: '/users', name: 'Users', component: UsersListComponent },
    { path: '/users/:id', name: 'UserEdit', component: UserEditComponent },
    { path: '/roles', name: 'Roles', component: RolesListComponent },
    { path: '/roles/:id', name: 'RoleEdit', component: RoleEditComponent },
    { path: '/sections', name: 'Sections', component: SectionsListComponent },
    { path: '/sections/:id', name: 'SectionEdit', component: SectionEditComponent },
    { path: '/permissions', name: 'Permissions', component: PermissionsListComponent },
    { path: '/permissions/:id', name: 'PermissionEdit', component: PermissionEditComponent },
    { path: '/organizations', name: 'Organizations', component: OrganizationListComponent },
    { path: '/organizations/:organizationid', name: 'OrganizationEdit', component: OrganizationEditComponent },
    { path: '/organizations/:organizationid/departments/:departmentid', name: 'DepartmentEdit', component: DepartmentEditComponent },
    // { path: '/organizations/:organizationid/departments/:departmentid/staffestablishedpost/:positionid', name: 'StaffEstablishedPostEdit', component: StaffEstablishedPostEditComponent },
    { path: '/sicklists', name: 'Sicklists', component: SicklistListComponent },
    { path: '/sicklists/:id', name: 'SicklistEdit', component: SicklistEditComponent }
])
export class App {
    jwt: string;
    decodedJwt: any;
    profile: Profile;
    currentRole: number;
    constructor(public appState: AppState) {
        let token = localStorage.getItem('jwt');
        if (token) {
            this.jwt = token;
        }
    }

    // ngOnInit() {
    // }

}
