// Vendor libs
import { Component, Input, Output, EventEmitter } from '@angular/core';

// Libs
import { ComponentBase } from './componentbase';
import { RouterActive } from '../UI/CustomRouter/router-active.directive';
import { LoginComponent } from '../login/Login.component';
import { Profile } from '../Model';
// import { API } from '../Services';

@Component({
    selector: 'app-menu',
    styles: [require('./menu.css')],
    template: require('./Menu.html'),
    directives: [LoginComponent, RouterActive]
})
export class MenuComponent extends ComponentBase {
    @Input() profile: Profile;
    @Input() currentRole: number;
    @Output() RoleChanged = new EventEmitter();
    public oneAtATime: boolean = true;
    constructor() {
        super();
    }
    ChangeRole(roleid) {
        console.log('change role ' + roleid);
        localStorage.setItem('forrole', roleid);
        this.currentRole = roleid;
        this.RoleChanged.emit(this.currentRole);
    }

}
