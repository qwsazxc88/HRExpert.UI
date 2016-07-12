// Vendor libs
import { Component } from '@angular/core';
// import { Router,  } from '@angular/router-deprecated';
import { OnInit } from '@angular/core';

// Libs

import { API } from '../../Services';
import { Sicklist, Document } from '../../Model';

@Component({
    selector: 'sicklist-list',
    template: require('./List.html'),
    providers: [API],
    directives: [/*, /*BS_DIRECTIVES,*/ ]
})
export class SicklistListComponent implements OnInit {
    errorMessage: string;
    Model: Document<Sicklist>[];
    stringAsDate(dateStr) {
        return new Date(dateStr);
    }
    constructor(private Api: API, private _router: Router) {
    }

    ngOnInit() {
        this.Get();
    }

    Get() {
        this.Api.Sicklists().List()
            .subscribe(
            result => this.Model = result,
            error => this.errorMessage = error
            );
    }

    Edit(entity: Document<Sicklist>) {
        let link = ['SicklistEdit', { id: entity.Data.Id }];
        this._router.navigate(link);
    }

    Create() {
        let link = ['SicklistEdit', { id: 0 }];
        this._router.navigate(link);
    }
}
