/*
 * These are globally available services in any component or any other service
 */


import {provide} from '@angular/core';

// Angular 2
import {FORM_PROVIDERS,HashLocationStrategy, LocationStrategy} from '@angular/common';

// Angular 2 Http
import {HTTP_PROVIDERS} from '@angular/http';
// Angular 2 Router
import {ROUTER_PROVIDERS/*, LocationStrategy, HashLocationStrategy*/} from '@angular/router-deprecated';

// Angular 2 Material
// import {MdRadioDispatcher} from '@angular2-material/radio/radio_dispatcher';
// const MATERIAL_PROVIDERS = [
//   MdRadioDispatcher
// ];

/*
* Application Providers/Directives/Pipes
* providers/directives/pipes that only live in our browser environment
*/
//import {MATERIAL_PROVIDERS} from 'ng2-material';
import {BS_VIEW_PROVIDERS} from 'ng2-bootstrap';
import {OVERLAY_PROVIDERS} from "@angular2-material/core/overlay/overlay";
export const APPLICATION_PROVIDERS = [
  ...FORM_PROVIDERS,
  ...HTTP_PROVIDERS,
  ...OVERLAY_PROVIDERS,
   ...BS_VIEW_PROVIDERS,
  ...ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
