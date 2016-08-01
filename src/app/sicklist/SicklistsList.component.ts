// Vendor libs
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

// Libs

import { API } from '../Services';
import { Sicklist, $Document } from '../Model';

@Component({
    selector: 'sicklist-list',
    template: require('./List.html'),
    providers: [API],
    directives: [/*, /*BS_DIRECTIVES,*/ ]
})
export class SicklistsListComponent implements OnInit {
    errorMessage: string;
    Model: $Document<Sicklist>[];
    stringAsDate(dateStr) {
        return new Date(dateStr);
    }
    constructor(private Api: API, private _router: Router, private r: ActivatedRoute) {
        console.info('SicklistsListComponent constructor');
    }

    ngOnInit() {
        console.info('SicklistsListComponent ngOnInit');
        this.Get();
    }

    Get() {
        this.Api.Sicklists().List()
            .subscribe(
            result => this.Model = result,
            error => this.errorMessage = error
            );
    }

    Edit(entity: $Document<Sicklist>) {
        let link = [ entity.Data.Id ];
        this._router.navigate(link, {relativeTo : this.r});
    }

    Create() {
        // let link = ['SicklistEdit', { id: 0 }];
        this._router.navigate([0], {relativeTo : this.r});
    }
}
