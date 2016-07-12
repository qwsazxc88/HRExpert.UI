// Vendor libs
import { Component } from '@angular/core';
// import { Router,  } from '@angular/router-deprecated';
import { OnInit } from '@angular/core';

// Libs
import { API } from '../../Services';
import { Role } from '../../Model';

@Component({
    selector: 'roles-list',
    template: require('./List.html'),
    providers: [API]
    // directives: []
})
export class RolesListComponent implements OnInit {
    constructor(private Api: API, private _router: Router) {
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
        let link = ['RoleEdit', { id: role.Id }];
        this._router.navigate(link);
    }
    Create() {
        let link = ['RoleEdit', { id: 0 }];
        this._router.navigate(link);
    }
}
