// Vendor libs
import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
// Libs
import { API } from '../../Services';
import { Permission, Section } from '../../Model';


@Component({
    selector: 'permission-edit',
    template: require('./Edit.html'),
    directives: [/*BS_DIRECTIVES,*/ ],
    providers: [API]
})

export class PermissionEditComponent implements OnInit {
    constructor(private Api: API, private _routeParams: RouteParams) {
        this.Model = new Permission(0, '');
        Api.Sections().List()
            .subscribe(
            result => { this.Sections = result; },
            error => this.errorMessage = <any>error
            );
    }

    errorMessage: string;
    Model: Permission;
    Sections: Section[];
    SelectedSection: number;

    ngOnInit() {
        let id = +this._routeParams.get('id');
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
