//Vendor libs
import {Component,Input,OnInit} from 'angular2/core';
import {NgSelectOption,NgModel} from 'angular2/common';
import {RouteParams} from 'angular2/router';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
//libs
import {RouterActive} from '../../router-active'
import {LoginComponent} from '../login/Login.component';
import {Profile} from '../../Model/Profile';
@Component({
    selector: 'app-menu',
    template: require('./Menu.html'),
    directives:[LoginComponent,MD_LIST_DIRECTIVES,RouterActive]
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