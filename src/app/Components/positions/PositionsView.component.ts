// Vendor libs
import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';
import { OnInit, Input } from '@angular/core';
// import { NgClass } from '@angular/common';
// Libs
import { API } from '../../Services';
import { BS_DIRECTIVES } from '../BS_DIRECTIVES';
import { APP_UI_COMPONENTS } from '../APP_UI_COMPONENTS';
import { Position } from '../../Model';

@Component({
    selector: 'position-view',
    template: require('./View.html'),
    providers: [API],
    directives: [ROUTER_DIRECTIVES, APP_UI_COMPONENTS, /*BS_DIRECTIVES,*/ ]
})

export class PositionsViewComponent implements OnInit {
    constructor(private Api: API, private _router: Router, private _routeParams: RouteParams) {
    }

    @Input() Position: number;
    errorMessage: string;
    Model: Position;
    ngOnInit() {
        console.log(this.Position);
        this.Get();
    }
    Get() {
        this.Api.Positions(this.Position).Read()
            .subscribe(
            data  => this.Model = data,
            error => this.errorMessage = <any>error
            );
    }
}
