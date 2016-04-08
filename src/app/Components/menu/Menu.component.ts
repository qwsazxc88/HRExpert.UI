//Vendor libs
import {Component,Input,OnInit} from 'angular2/core';
import {NgSelectOption,NgModel} from 'angular2/common';
import {RouteParams} from 'angular2/router';
//libs
import {LoginMenuComponent} from '../login/LoginMenu.component';
@Component({
    selector: 'app-menu',
    template: require('./Menu.html'),
    directives:[LoginMenuComponent]
})

export class MenuComponent
{ 
	constructor () 
	{		
	}    
}