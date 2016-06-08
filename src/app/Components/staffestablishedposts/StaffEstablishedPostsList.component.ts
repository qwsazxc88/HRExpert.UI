//Vendor libs
import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {OnInit, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';
//Libs
import {API} from '../../Services';
import {MD_COMPONENTS} from '../MD_COMPONENTS';
import {APP_UI_COMPONENTS} from '../APP_UI_COMPONENTS';
import {StaffEstablishedPost} from '../../Model';
import {PositionsViewComponent} from '../positions/PositionsView.component'
@Component({
    selector: 'staffestablishedpost-list',
    template: require('../../Views/staffestablishedpost/List.html'),
    providers: [API],
    directives: [ROUTER_DIRECTIVES, APP_UI_COMPONENTS, MD_COMPONENTS,PositionsViewComponent]
})

export class StaffEstablishedPostListComponent implements OnInit {
    constructor (private Api: API, private _router: Router, private _routeParams: RouteParams) {
    }
    Organization: number;
    Department: number;
    errorMessage: string;
    Model: StaffEstablishedPost[];
    ngOnInit() {
        this.Organization =+ this._routeParams.get('organizationid');
        this.Department =+ this._routeParams.get('departmentid');
        this.Get();
    }
    Get() {
        this.Api.Organizations(this.Organization).Departments(this.Department).StaffEstablishedPosts().List()
        .subscribe(
          data=> this.Model=data,
          error=> this.errorMessage=<any>error  
        );
    }   
    Edit(entity: StaffEstablishedPost) {
	  let link = ['StaffEstablishedPostEdit', { positionid: entity.PositionId, organizationid: this.Organization, departmentid:this.Department }];
	  this._router.navigate(link);
	} 
}