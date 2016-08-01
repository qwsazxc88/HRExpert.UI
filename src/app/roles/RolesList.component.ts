// Vendor libs
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Libs
import { API } from '../Services';
import { Role } from '../Model';

@Component({
    selector: 'roles-list',
    template: require('./List.html'),
    providers: [API]
    // directives: []
})
export class RolesListComponent implements OnInit {
    constructor(private Api: API, private _router: Router, private r: ActivatedRoute) {
    }

    errorMessage: string;
    Model: Role[];

    ngOnInit() {
        this.Get();
    }

    Get() {
        this.Api.Roles().List()
            .subscribe(
            roles => { this.Model = roles; },
            error => this.errorMessage = <any>error
            );
    }
    Edit(role: Role) {
        let link = [role.Id];
        this._router.navigate(link, {relativeTo : this.r});
    }
    Create() {
        let link = [0];
        this._router.navigate(link, {relativeTo : this.r});
    }
}
