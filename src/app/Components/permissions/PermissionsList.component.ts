// Vendor libs
import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { OnInit } from '@angular/core';

// Libs
import { API } from '../../Services';
import { Permission } from '../../Model';

@Component({
    selector: 'sections-list',
    template: require('./List.html'),
    providers: [API]
    // directives: []
})

export class PermissionsListComponent implements OnInit {
    constructor(private Api: API, private _router: Router) {
    }

    errorMessage: string;
    Model: Permission[];

    ngOnInit() {
        this.Get();
    }

    Get() {
        this.Api.Permissions().List()
            .subscribe(
            result => { this.Model = result; },
            error => this.errorMessage = <any>error
            );
    }
    Edit(entity: Permission) {
        let link = ['PermissionEdit', { id: entity.Id }];
        this._router.navigate(link);
    }
    Create() {
        let link = ['PermissionEdit', { id: 0 }];
        this._router.navigate(link);
    }
}
