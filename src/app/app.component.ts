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
