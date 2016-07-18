// Vendor libs
import { Component, Input, Output, EventEmitter, OnInit, ViewContainerRef } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
// import { HTTP_PROVIDERS  } from '@angular/http';

// Libs

import { API } from '../Services';
import { Login, Profile } from '../Model';
import * as tokenHelper from '../Utils/Token/TokenHelper';
import { Auth } from '../app.auth';

@Component({
    template: require('./Login.html'),
    selector: 'hre-login',
    directives: [/*BS_DIRECTIVES,*/ ],
    providers: [API]
})
export class LoginComponent implements OnInit {
    constructor(private Api: API, private auth: Auth/*, private routerState: RouterStateSnapshot*/) {
        this.Model = new Login();
        // this.redirectUrl = routerState.fragment;
    }

    // @Input() jwt: string;
    // @Input() decodedJwt: any;
    // @Input() profile: Profile;
    // @Output() jwtChange = new EventEmitter();
    // @Output() decodedJwtChange = new EventEmitter();
    // @Output() profileChange = new EventEmitter();
    errorMessage: string;
    Model: Login;
    redirectUrl: string;
    private jwt: string;

    ngOnInit() {
        this.jwt = this.auth.jwt;
        this.checkExpiration();
        // if (this.jwt) {
        //     decodedJwt = tokenHelper.decodeToken(this.jwt);
        //     decodedJwtChange.emit(this.decodedJwt);
        //     this.getProfile();
        // }
    }

    submit() {
        this.Api.login(this.Model).subscribe(
            jwt => {
                this.auth.jwt = jwt;
                this.jwt = jwt;
                // this.jwtChange.emit(this.jwt);
                // this.decodedJwt = tokenHelper.decodeToken(jwt);
                // this.decodedJwtChange.emit(this.decodedJwt);
                this.getProfile();
            },
            error => this.errorMessage = <any>error
        );
    }

    getProfile() {
        this.Api.profile().subscribe(
            data => { this.auth.profile = data;
                //  this.profileChange.emit(this.profile);
              },
            error => this.errorMessage = <any>error
        );
    }

    logout() {
        this.jwt = null;
        this.auth.jwt = null;
        // this.jwtChange.emit(this.jwt);
        // localStorage.removeItem('jwt');
    }

    checkExpiration() {
        if (this.jwt) {
            let exp = tokenHelper.isTokenExpired(this.jwt);
            if (exp) { this.logout(); }
        }
        // setTimeout(() => { this.checkExpiration(); }, 5000);
    }
}
