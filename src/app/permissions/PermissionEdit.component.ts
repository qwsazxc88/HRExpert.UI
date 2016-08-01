// Vendor libs
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
// Libs
import { API } from '../Services';
import { Permission, Section } from '../Model';

@Component({
    selector: 'permission-edit',
    template: require('./Edit.html'),
    // directives: [],
    providers: [API]
})
export class PermissionEditComponent implements OnInit {
    constructor(private Api: API, ars: ActivatedRoute) {
        this.Model = new Permission(0, '');
        this._routeParams = ars.snapshot.params;
        Api.Sections().List()
            .subscribe(
            result => { this.Sections = result; },
            error => this.errorMessage = <any>error
            );
    }

    _routeParams: Params;
    errorMessage: string;
    Model: Permission;
    Sections: Section[];
    SelectedSection: number;

    ngOnInit() {
        let id = +this._routeParams['id'];
        if (id > 0) {
            this.Get(id);
        }
    }

    Save() {
        var data = this.Model;
        data.Section = this.Sections.filter(x => x.Id == this.SelectedSection)[0];
        console.log(data);
        if (data.Id > 0) {
            this.Api.Permissions().Update(data)
                .subscribe(
                result => { this.Model = result; },
                error => this.errorMessage = <any>error
                );
        } else {
            this.Api.Permissions().Create(data)
                .subscribe(
                result => { this.Model = result; },
                error => this.errorMessage = <any>error
                );
        }
    }
    Delete() {
        var data = this.Model;
        if (data.Id > 0) {
            this.Api.Permissions(data.Id).Delete()
                .subscribe(
                error => this.errorMessage = <any>error
                );
        }
    }
    Get(id) {
        this.Api.Permissions(id).Read()
            .subscribe(
            result => { this.Model = result; this.SelectedSection = this.Model.Section.Id; },
            error => this.errorMessage = <any>error
            );
    }
}
