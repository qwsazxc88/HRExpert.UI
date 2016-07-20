// Vendor libs
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
// import { RouteConfig, Router } from '@angular/router';

// import { HTTP_PROVIDERS } from '@angular/http';
// import { BS_VIEW_PROVIDERS } from 'ng2-bootstrap';
// Libs
/*import {
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
} from './';*/
// import { LoginComponent } from './login/Login.component';
// import { MenuComponent } from './menu/Menu.component';
// import { LoggedInRouterOutlet } from './UI/CustomRouter/LoggedInOutlet';

// import { API } from '../Services';
// import { Profile } from './Model';
import { AppState } from './app.service';
// import { Auth } from './app.auth';

@Component({
    selector: 'hre-app',
    pipes: [JsonPipe],
    // providers: [API],
    directives: [/*MenuComponent*/],
    // encapsulation: ViewEncapsulation.None, // Global styles
    styles: [require('./app.css')],
    template: require('./app.html')
})
export class App /*implements OnInit */{
    // jwt: string;
    // decodedJwt: any;
    // profile: Profile;
    // currentRole: number;
    constructor(public appState: AppState/*, public auth: Auth*/) {
        console.log('App constructor');
        /*let token = auth.jwt;
        if (token) {
            this.jwt = token;
        }*/
    }
    /*ngOnInit() {
        this.profile = this.auth.profile;
        console.dir(this.profile);
    }*/
}
