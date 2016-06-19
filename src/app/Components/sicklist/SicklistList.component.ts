//Vendor libs
import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
//Libs
import {MD_COMPONENTS} from '../';
import {API} from '../../Services';
import {Sicklist, Document} from '../../Model';

@Component({
    selector: 'sicklist-list',
    template: require('../../Views/sicklist/List.html'),
    providers: [API],
    directives: [ROUTER_DIRECTIVES, MD_COMPONENTS]
})
export class SicklistListComponent implements OnInit {
    errorMessage: string;
    Model: Sicklist[];

    constructor(private Api: API, private _router: Router) {
    }

    ngOnInit() {
        this.Get();
    }

    Get() {
        this.Api.Sicklists().List()
            .subscribe(
            result => { this.Model = result; },
            error => this.errorMessage = <any>error
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
