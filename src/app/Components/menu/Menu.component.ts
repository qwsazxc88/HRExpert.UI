//Vendor libs
import {Component, Input, OnInit} from 'angular2/core';
import {NgSelectOption, NgModel} from 'angular2/common';
import {RouteParams} from 'angular2/router';
//libs
import {RouterActive} from '../APP_UI_COMPONENTS';
import {LoginComponent} from '../login/Login.component';
import {Profile} from '../../Model';
@Component({
    selector: 'app-menu',
    styles: [require('../../Views/menu/menu.css')],
    template: require('../../Views/menu/Menu.html'),
    directives:[LoginComponent, RouterActive]
})

export class MenuComponent
{ 
    @Input() profile: Profile;
	constructor () 
	{
	}
    findPermisisonByName(name)
    {
        if(this.profile && this.profile.Permissions)        
        {                
           return this.profile.Permissions.filter(x=>x.Section.Name==name);
        }
        else return null;
    }
    findPermissionById(id)
    {
        if(this.profile && this.profile.Permissions) 
        {
            let result =  this.profile.Permissions.filter(x=>x.Section.Id==id);
            return result.length>0;
        }
        else return null;
    }
}