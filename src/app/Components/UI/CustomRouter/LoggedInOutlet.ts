import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';
import {LoginComponent} from '../../';

@Directive({selector: 'loggedin-router-outlet'})

export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes: any;
  private parentRouter: Router;

  constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader,
              _parentRouter: Router, @Attribute('name') nameAttr: string) {
    super(_elementRef, _loader, _parentRouter, nameAttr);

    this.parentRouter = _parentRouter;
    this.publicRoutes = {
      '': true
    };
  }

  activate(instruction: ComponentInstruction) {
    let url = instruction.urlPath;
    if (!this.publicRoutes[url] && !localStorage.getItem('jwt')) {
      this.parentRouter.navigateByUrl('/');
	  return;
    }
    return super.activate(instruction);
  }
}