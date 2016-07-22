// Vendor libs
import { Component } from '@angular/core';
import { Router, RouteParams } from '@angular/router';
import { OnInit, Input } from '@angular/core';

// Libs
import { API } from '../../Services';
import { Position } from '../../Model';

@Component({
    selector: 'position-view',
    template: require('./View.html'),
    providers: [API]
    // directives: []
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
