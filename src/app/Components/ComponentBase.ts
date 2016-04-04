//Vendor libs
import {Component} from 'angular2/core';
import {Router,ROUTER_DIRECTIVES,OnActivate,OnDeactivate,ComponentInstruction} from 'angular2/router';

@Component({
	directives: [ROUTER_DIRECTIVES]
})
export class ComponentBase implements OnActivate , OnDeactivate
{
	constructor(){
		this.active=true;
		}
	active:boolean;
	routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
		this.active=true;
		return new Promise(resolve => {
			setTimeout(() => resolve(null), 800);
		});
	}
	routerOnDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
		this.active=false;
		return new Promise(resolve => {
			setTimeout(() => resolve(null), 800);
		});
	}
}