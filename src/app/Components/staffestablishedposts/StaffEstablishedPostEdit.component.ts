//Vendor libs
import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES, RouteParams} from '@angular/router-deprecated';
import {OnInit, Input} from '@angular/core';
import {NgClass} from '@angular/common';
//Libs
import {API} from '../../Services';
import {MD_COMPONENTS} from '../MD_COMPONENTS';
import {APP_UI_COMPONENTS} from '../APP_UI_COMPONENTS';
import {StaffEstablishedPost} from '../../Model';
import {PositionsViewComponent} from '../positions/PositionsView.component';
import {PersonsListComponent} from '../persons/PersonsList.component'
@Component({
    selector: 'staffestablishedpost-edit',
    template: require('../../Views/staffestablishedpost/Edit.html'),
    providers: [API],
    directives: [ROUTER_DIRECTIVES, APP_UI_COMPONENTS, MD_COMPONENTS,PositionsViewComponent,PersonsListComponent]
})

export class StaffEstablishedPostEditComponent implements OnInit {
    constructor (private Api: API, private _router: Router, private _routeParams: RouteParams) {
    }
    Organization: number;
    Department: number;
    Position: number;
    errorMessage: string;
    Model: StaffEstablishedPost;
    ngOnInit() {
        this.Organization =+ this._routeParams.get('organizationid');
        this.Department =+ this._routeParams.get('departmentid');
        this.Position =+ this._routeParams.get('positionid');
        this.Get();
    }
    Get() {
        this.Api.Organizations(this.Organization).Departments(this.Department).StaffEstablishedPosts(this.Position).Read()
        .subscribe(
          data=> this.Model=data,
          error=> this.errorMessage=<any>error  
        );
    }    
}