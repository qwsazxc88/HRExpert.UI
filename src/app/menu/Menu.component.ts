// Vendor libs
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

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
export class MenuComponent implements OnInit/* extends ComponentBase*/ {
    // @Input() profile: Profile;
    // @Input() currentRole: number;
    // @Output() RoleChanged = new EventEmitter();
    // public oneAtATime: boolean = true;
    profile: Profile;
    constructor(private auth: Auth) {
        console.log('MenuComponent constructor');
        // super();
    }

    ngOnInit() {
        console.log('MenuOninit');
        this.profile = this.auth.profile;
    }

    /*ChangeRole(roleid) {
        console.log('change role ' + roleid);
        this.auth.currentRole = roleid;
        // this.currentRole = roleid;
        // this.RoleChanged.emit(this.currentRole);
    }*/

}
