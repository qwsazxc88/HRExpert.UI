// Vendor libs
import { Component, OnInit } from '@angular/core';
// import { RouteParams } from '@angular/router-deprecated';

// Libs
import { API } from '../Services';
import { Section } from '../Model';

@Component({
    selector: 'section-edit',
    template: require('./Edit.html'),
    // directives: [],
    providers: [API]
})
export class SectionEditComponent implements OnInit {
    constructor(private Api: API, private _routeParams: RouteParams) {
        this.Model = new Section(0, '');
    }

    errorMessage: string;
    Model: Section;

    ngOnInit() {
        let id = +this._routeParams.get('id');
        if (id > 0) {
            this.Get(id);
        }
    }

    Save() {
        var data = this.Model;
        if (data.Id > 0) {
            this.Api.Sections().Update(data)
                .subscribe(
                result => { this.Model = result; },
                error => this.errorMessage = <any>error
                );
        } else {
            this.Api.Sections().Create(data)
                .subscribe(
                result => { this.Model = result; },
                error => this.errorMessage = <any>error
                );
        }
    }
    Delete() {
        var data = this.Model;
        if (data.Id > 0) {
            this.Api.Sections(data.Id).Delete()
                .subscribe(
                error => this.errorMessage = <any>error
                );
        }
    }
    Get(id) {
        this.Api.Sections(id).Read()
            .subscribe(
            result => { this.Model = result; },
            error => this.errorMessage = <any>error
            );
    }
}
