import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Profile } from './Model';
// import { API } from './Services';
import * as tokenHelper from './Utils/Token/TokenHelper';

@Injectable()
export class Auth {
    constructor(private http: Http, private router: Router) {
        console.log('Auth constructor');
    }

    // currentRole: number;

    get profile() {
        console.info('get profile');
        return this._profile;
    }
    set profile(v: Profile) {
        this._profile = v;
    }
    _profile: Profile;

    get jwt() {
        console.info('get jwt');
        return this._jwt;
    }
    set jwt(value: string) {
        console.info('set jwt');
        this._jwt = value;
        window.localStorage.setItem('jwt', value);
    }
    private _jwt: string;

    Init() {
        console.info('Auth#Init');
        const token = localStorage.getItem('jwt');
        if (token && !tokenHelper.isTokenExpired(token)) {
            this._jwt = token;
            this.getProfile(() => {});
        }
        setTimeout(() => { this.checkExpiration(); }, 30e4);
    }

    getProfile(resolve) {
        this.requestProfile().subscribe(
            data => {
                this.profile = data;
                //  this.profileChange.emit(this.profile);
            },
            error => { console.dir(error); Observable.throw(error || 'Server error'); },
            () => { console.info('getProfile#resolve()'); resolve(); }
        );
    }

    login(login: string, pass: string): Promise<void> {
        return new Promise<void>((res, rej) =>
            this.requestToken(login, pass).subscribe(
                jwt => {
                    this.jwt = jwt;
                    this.getProfile(res);
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
    }

    logout() {
        this.jwt = null;
        this.profile = null;
        this.router.navigate(['/login', this.router.url]);
        // this.jwtChange.emit(this.jwt);
    }

    canNavigate(): boolean {
        console.debug('canNavigate');
        if (this.jwt) {
            console.debug('canNavigate#if (this.jwt)');
            if (!tokenHelper.isTokenExpired(this.jwt)) {
                console.debug('canNavigate#if isTokenExpired');
                if (this.profile) {
                    console.debug('canNavigate#if (this.profile)');
                    return true;
                }
            }
        }
        return false;
    }

    private requestToken(login: string, password: string): Observable<string> {
        // console.log(this.http);
        let body = this.transformRequest({
            username: login,
            password: password,
            grant_type: 'password'
        });
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://ruscount.com:9034/api/v1/connect/token', body, options)
            .map(res => <string>(res.json().access_token))
            .catch(error => Observable.throw(error || 'Server error'));
    }

    private requestProfile(): Observable<Profile> {
        const options = this.CreateOptions();
        const url = 'http://ruscount.com:9034/api/v1/profile';
        return this.http.get(url, options)
            .map(res => <Profile>res.json())
            .catch(function(error: Response) {
                console.error('Error in requestProfile call', error);
                return Observable.throw(error || 'Server error');
            });
    }

    private transformRequest(obj) {
        let str = [];
        for (let p in obj) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
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
