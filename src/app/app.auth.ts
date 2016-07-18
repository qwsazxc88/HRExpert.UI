import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Profile } from './Model';

@Injectable()
export class Auth {
    profile: Profile;
    jwt: string;
    constructor() { }
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
