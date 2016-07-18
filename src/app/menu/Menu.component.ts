// Vendor libs
import { Component, Input, Output, EventEmitter } from '@angular/core';

// Libs
// import { ComponentBase } from './componentbase';
// import { RouterActive } from '../UI/CustomRouter/router-active.directive';
// import { LoginComponent } from '../login/Login.component';
import { Profile } from '../Model';
// import { API } from '../Services';
import { Auth } from '../app.auth';

@Component({
    selector: 'hre-menu',
    styles: [require('./menu.css')],
    template: require('./Menu.html'),
    // directives: [LoginComponent, RouterActive]
})
export class MenuComponent/* extends ComponentBase*/ {
    @Input() public profile: Profile;
    // @Input() currentRole: number;
    // @Output() RoleChanged = new EventEmitter();
    // public oneAtATime: boolean = true;
    constructor(private auth: Auth) {
        console.dir('#####################', this.profile);
        // super();
    }
    ChangeRole(roleid) {
        console.log('change role ' + roleid);
        this.auth.currentRole = roleid;
        // this.currentRole = roleid;
        // this.RoleChanged.emit(this.currentRole);
    }

}
