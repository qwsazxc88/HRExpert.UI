// Vendor libs
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { HTTP_PROVIDERS  } from '@angular/http';

// Libs

// import { API } from '../Services';
// import { Profile } from '../Model';
import { Auth } from '../app.auth';

@Component({
    template: require('./Login.html'),
    selector: 'hre-login',
    // directives: [/*BS_DIRECTIVES,*/],
    // providers: [API]
})
export class LoginComponent implements OnInit {
    constructor(/*private Api: API,*/ private auth: Auth, private router: Router/*, private routerState: RouterStateSnapshot*/) {
        // this.Model = new Login();
        // this.redirectUrl = routerState.fragment;
    }

    // @Input() jwt: string;
    // @Input() decodedJwt: any;
    // @Input() profile: Profile;
    // @Output() jwtChange = new EventEmitter();
    // @Output() decodedJwtChange = new EventEmitter();
    // @Output() profileChange = new EventEmitter();
    errorMessage: string;
    // Model: Login;
    redirectUrl: string;
    // private jwt: string;

    ngOnInit() {
        this.redirectUrl = this.router.routerState.snapshot.queryParams['url'];
        // this.jwt = this.auth.jwt;
        // this.auth.checkExpiration();
        // if (this.jwt) {
        //     decodedJwt = tokenHelper.decodeToken(this.jwt);
        //     decodedJwtChange.emit(this.decodedJwt);
        //     this.getProfile();
        // }
    }

    submit(ev: Event, login: string, pass: string) {
        ev.preventDefault();
        this.auth.login(login, pass)
         .then( () => this.router.navigate([this.redirectUrl ? this.redirectUrl : '']) )
         .catch( err => this.errorMessage = err);
    }

}
