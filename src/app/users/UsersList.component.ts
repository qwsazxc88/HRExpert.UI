// Vendor libs
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    constructor(private Api: API, private _router: Router, private r: ActivatedRoute) {
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
        let link = [user.Id];
        this._router.navigate(link, {relativeTo : this.r});
    }
    Create() {
        // let link = [0];
        this._router.navigate([0], {relativeTo : this.r});
    }
}
