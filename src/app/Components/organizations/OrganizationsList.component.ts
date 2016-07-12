// Vendor libs
import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
// Libs
import { BS_DIRECTIVES } from '../BS_DIRECTIVES';
import { API } from '../../Services';
import { Organization } from '../../Model';
@Component({
    selector: 'organization-list',
    template: require('./List.html'),
    providers: [API],
    directives: [ROUTER_DIRECTIVES, /*BS_DIRECTIVES,*/ ]
})

export class OrganizationListComponent implements OnInit {
    constructor(private Api: API, private _router: Router) {
    }

    errorMessage: string;
    Model: Organization[];

    ngOnInit() {
        this.Get();
    }

    Get() {
        this.Api.Organizations().List()
            .subscribe(
            result => { this.Model = result; },
            error => this.errorMessage = <any>error
            );
    }
    Edit(entity: Organization) {
        let link = ['OrganizationEdit', { organizationid: entity.Id }];
        this._router.navigate(link);
    }
    Create() {
        let link = ['OrganizationEdit', { organizationid: 0 }];
        this._router.navigate(link);
    }
}
