/*
 * These are globally available services in any component or any other service
 */

// Angular 2
import { /* FORM_PROVIDERS, HashLocationStrategy,*/ LocationStrategy, PathLocationStrategy } from '@angular/common';

// Angular 2 Http
import { HTTP_PROVIDERS } from '@angular/http';
// Angular 2 Router
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

// Angular 2 Material
// import { MdRadioDispatcher } from '@angular2-material/radio/radio_dispatcher';
// const MATERIAL_PROVIDERS = [
//   MdRadioDispatcher
// ];

// AngularClass
/*import { provideWebpack } from '@angularclass/webpack-toolkit';
import { providePrefetchIdleCallbacks } from '@angularclass/request-idle-callback';

import { routes, asyncRoutes, prefetchRouteCallbacks } from '../app/app.routes';
import { APP_RESOLVER_PROVIDERS } from '../app/app.resolver';*/

/*
* Application Providers/Directives/Pipes
* providers/directives/pipes that only live in our browser environment
*/
// import { MATERIAL_PROVIDERS } from 'ng2-material';
// import { OVERLAY_PROVIDERS } from "@angular2-material/core/overlay/overlay";
// import { BS_VIEW_PROVIDERS } from 'ng2-bootstrap';
export const APPLICATION_PROVIDERS = [

    ...ROUTER_PROVIDERS,
    /* New ROUTER !!!!!!!!!!
    ...APP_RESOLVER_PROVIDERS,

    provideRouter(routes),
    provideWebpack(asyncRoutes),
    providePrefetchIdleCallbacks(prefetchRouteCallbacks),*/

    ...HTTP_PROVIDERS,

    // ...BS_VIEW_PROVIDERS,
    // ...OVERLAY_PROVIDERS,

    { provide: LocationStrategy, useClass: PathLocationStrategy }
];

export const PROVIDERS = [
    ...APPLICATION_PROVIDERS
];
