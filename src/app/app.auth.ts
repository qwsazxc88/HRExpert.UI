import { Component, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { Profile } from './Model';
// import { API } from './Services';
import * as tokenHelper from './Utils/Token/TokenHelper';

// @Component({ providers: [forwardRef(() => API)] })
@Injectable()
export class Auth {
    constructor(private http: Http) {
        console.log('Auth constructor');
        const token = localStorage.getItem('jwt');
        // сделать что нибудь если в вместо токена мусор
        if (token) {
            try {
                if (!tokenHelper.isTokenExpired(token)) this._jwt = token;
                this.getProfile(Promise.resolve);
            } catch (e) { };
        }
    }
    currentRole: number;
    profile: Profile;
    private _jwt: string;

    get jwt() {
        console.log('get jwt');
        return this._jwt;
    }

    set jwt(value: string) {
        console.log('set jwt');
        this._jwt = value;
        localStorage.setItem('jwt', value);
    }

    getProfile(resolve?) {
        this.requestProfile().subscribe(
            data => {
                this.profile = data;
                //  this.profileChange.emit(this.profile);
            },
            error => Observable.throw(error.json().error || 'Server error'),
            () => resolve()
        );
    }

    login(login: string, pass: string): Promise<void> {
        return new Promise<void>((res, rej) =>
            this.getToken(login, pass).subscribe(
                jwt => {
                    this.jwt = jwt;
                    this.getProfile(() => res());
                    // this.jwtChange.emit(this.jwt);
                    // this.decodedJwt = tokenHelper.decodeToken(jwt);
                    // this.decodedJwtChange.emit(this.decodedJwt);
                }, error => rej(error))
        );
    }

    checkExpiration() {
        if (this.jwt) {
            let exp = tokenHelper.isTokenExpired(this.jwt);
            if (exp) { this.logout(); }
        }
        setTimeout(() => { this.checkExpiration(); }, 30e3);
    }

    logout() {
        // this.jwt = null;
        this.jwt = null;
        this.profile = null;
        // this.jwtChange.emit(this.jwt);
        // localStorage.removeItem('jwt');
    }

    canNavigate(): boolean {
        return this.jwt ? !tokenHelper.isTokenExpired(this.jwt) : false;
    }

    private getToken(login: string, password: string): Observable<string> {
        // console.log(this.http);
        let body = this.transformRequest({
            username: login,
            password: password,
            grant_type: 'password'
        });
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://ruscount.com:9034/connect/token', body, options)
            .map(res => <string>(res.json().access_token))
            .catch(error => Observable.throw(error.json().error || 'Server error'));
    }

    private requestProfile(): Observable<Profile> {
        const options = this.CreateOptions();
        const url = 'http://ruscount.com:9034/api/v1/profile';
        return this.http.get(url, options)
            .map(res => <Profile>res.json())
            .catch(function(error: Response) {
                console.error('Error in getprofile call', error);
                return Observable.throw(error.json().error || 'Server error');
            });
    }

    private transformRequest(obj) {
        let str = [];
        for (let p in obj)
        { str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p])); }
        return str.join('&');
    }
    private CreateOptions() {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        if (this.jwt) {
            headers.append('Authorization', 'Bearer ' + this.jwt);
        }
        return new RequestOptions({ headers: headers });
    }
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: Auth, private router: Router) {
        console.log('AuthGuard constructor');
    }

    canActivate(): /*Observable<boolean> | */boolean {
        console.log('AuthGuard#canActivate() ', this.auth.jwt ? 'token' : 'no token');
        if (this.auth.canNavigate()) { return true; }
        this.router.navigate(['/login']);
        return false;
    }
}

export const AUTH_PROVIDERS = [
    Auth, AuthGuard
];
