// Vendor libs
import { Component } from '@angular/core';
// import { Router } from '@angular/router-deprecated';
import { OnInit } from '@angular/core';
// Libs
import { API } from '../Services';
import { User } from '../Model';

@Component({
    selector: 'users-list',
    template: require('./List.html'),
    // directives: [],
    providers: [API]
})
export class UsersListComponent implements OnInit {
    constructor(private Api: API, private _router: Router) {
    }

    errorMessage: string;
    Model: User[];

    ngOnInit() {
        this.Get();
    }
    Get() {
        this.Api.Users().List()
            .subscribe(
            users => { this.Model = users; },
            error => this.errorMessage = <any>error
            );
    }
    Edit(user: User) {
        let link = ['UserEdit', { id: user.Id }];
        this._router.navigate(link);
    }
    Create() {
        let link = ['UserEdit', { id: 0 }];
        this._router.navigate(link);
    }
}
