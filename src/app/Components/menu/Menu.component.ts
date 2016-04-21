//Vendor libs
import {Component, Input, OnInit} from 'angular2/core';
import {NgSelectOption, NgModel} from 'angular2/common';
import {RouteParams} from 'angular2/router';
//libs
import {ComponentBase} from '../componentbase';
import {RouterActive} from '../APP_UI_COMPONENTS';
import {LoginComponent} from '../login/Login.component';
import {Profile} from '../../Model';
@Component({
    selector: 'app-menu',
    styles: [require('../../Views/menu/menu.css')],
    template: require('../../Views/menu/Menu.html'),
    directives:[LoginComponent, RouterActive]
})

export class MenuComponent extends ComponentBase
{     
    @Input() profile: Profile;
	constructor () 
	{
        super();
	}  
      
}