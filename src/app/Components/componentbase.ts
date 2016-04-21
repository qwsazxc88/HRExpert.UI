import {Component,Input} from 'angular2/core';
import {Profile} from '../Model';
export class ComponentBase
{
    @Input() profile : Profile;
    CheckPermission(id)
    {
        if(this.profile && this.profile.Permissions) 
        {
            let result =  this.profile.Permissions.filter(x=>x.Id==id);
            return result.length>0;
        }
        else return null;
    }
}