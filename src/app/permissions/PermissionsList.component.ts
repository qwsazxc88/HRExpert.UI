// Vendor libs
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Libs
import { API } from '../Services';
import { Permission } from '../Model';

@Component({
    selector: 'sections-list',
    template: require('./List.html'),
    providers: [API]
    // directives: []
})

export class PermissionsListComponent implements OnInit {
    constructor(private Api: API, private _router: Router, private r: ActivatedRoute) {
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
        let link = [entity.Id];
        this._router.navigate(link, {relativeTo : this.r});
    }
    Create() {
        let link = [0];
        this._router.navigate(link, {relativeTo : this.r});
    }
}
