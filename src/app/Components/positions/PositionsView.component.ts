//Vendor libs
import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES,RouteParams} from '@angular/router-deprecated';
import {OnInit, Input} from '@angular/core';
import {NgClass} from '@angular/common';
//Libs
import {API} from '../../Services';
import {MD_COMPONENTS} from '../MD_COMPONENTS';
import {APP_UI_COMPONENTS} from '../APP_UI_COMPONENTS';
import {Position} from '../../Model';

@Component({
    selector: 'position-view',
    template: require('../../Views/positions/View.html'),
    providers: [API],
    directives: [ROUTER_DIRECTIVES, APP_UI_COMPONENTS, MD_COMPONENTS]
})

export class PositionsViewComponent implements OnInit {
    constructor (private Api: API, private _router: Router, private _routeParams: RouteParams) {
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
            data => { this.Model = data},
            error => this.errorMessage = <any>error
        );
    }
}