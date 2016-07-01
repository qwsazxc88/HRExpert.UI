import {Component,Input} from '@angular/core';
import {Profile} from '../Model';
export class ComponentBase
{
    @Input() profile : Profile;
    CurrentRole : number;
    CheckPermission(id)
    {
        if(this.CurrentRole==1) return true;
        if(this.profile && this.profile.Roles) 
        {
            let currentrole = this.profile.Roles.filter(x=>x.Id==this.CurrentRole)[0];
            let permissions = currentrole.Permissions;
            let result =  permissions.filter(x=>x.Id==id);
            return result.length>0;
        }
        else return null;
    }
}