import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Profile } from './Model';

@Injectable()
export class Auth {
    private _profile: Profile;
    get profile(): Profile {
        return Object.assign({}, this._profile);
    }
    set profile(value: Profile) {
        this._profile = value;
    }

    currentRole: number;
    jwt: string;
    // constructor() { }
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: Auth, private router: Router) { }

    canActivate(): /*Observable<boolean> | */boolean {
        console.log('AuthGuard', this.auth.jwt);
        if (this.auth.jwt) { return true; }
        this.router.navigate(['/login']);
        return false;
    }
}

export const AUTH_PROVIDERS = [
    Auth, AuthGuard
];
