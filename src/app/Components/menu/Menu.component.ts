//Vendor libs
import {Component, Input, Output, OnInit,EventEmitter} from '@angular/core';
import {NgSelectOption, NgModel} from '@angular/common';
import {RouteParams} from '@angular/router-deprecated';
//libs
import {ComponentBase} from '../componentbase';
import {RouterActive} from '../APP_UI_COMPONENTS';
import {LoginComponent} from '../login/Login.component';
import {Profile} from '../../Model';
import {API} from '../../Services'
@Component({
    selector: 'app-menu',
    styles: [require('../../Views/menu/menu.css')],
    template: require('../../Views/menu/Menu.html'),
    directives:[LoginComponent, RouterActive]
})

export class MenuComponent extends ComponentBase
{     
    @Input() profile: Profile;
    @Input() currentRole: number;
    @Output() RoleChanged = new EventEmitter();
	constructor () 
	{
        super();
	}  
    ChangeRole(roleid)
    {
        console.log("change role "+ roleid);
        localStorage.setItem("forrole",roleid);
        this.currentRole = roleid;        
        this.RoleChanged.emit(this.currentRole);
    }
      
}