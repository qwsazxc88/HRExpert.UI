/** Async routes https://github.com/AngularClass/webpack-toolkit */
import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { RouterConfig } from '@angular/router';
import * as C from './APP_COMPONENTS';
// import { NoContent } from './no-content';

import { DataResolver } from './app.resolver';

export const routes: RouterConfig = [
  { path: '',      component: C.Home },
  // { path: 'users',  component: C.UsersListComponent },
  // { path: 'roles',  component: C.RolesListComponent },
  // { path: 'sections',  component: C.SectionsListComponent },
  // { path: 'permissions',  component: C.PermissionsListComponent },
  // { path: 'organizations',  component: C.OrganizationListComponent },
  // { path: 'sicklists',  component: C.SicklistListComponent },
  // { path: 'routePath',  component: C.TemplateComponent },
  // make sure you match the component type string to the require in asyncRoutes
  /*{ path: 'about', component: 'About',
    resolve: {
      'yourData': DataResolver
    }},
  // async components with children routes must use WebpackAsyncRoute
  { path: 'detail', component: 'Detail',
    canActivate: [ WebpackAsyncRoute ],
    children: [
      { path: '', component: 'Index' }  // must be included
    ]},
  // { path: '**',    component: NoContent },*/
];
/*@RouteConfig([
    { path: '/', name: 'Index', component: Home, useAsDefault: true },
    { path: '/users', name: 'Users', component: UsersListComponent },
    { path: '/users/:id', name: 'UserEdit', component: UserEditComponent },
    { path: '/roles', name: 'Roles', component: RolesListComponent },
    { path: '/roles/:id', name: 'RoleEdit', component: RoleEditComponent },
    { path: '/sections', name: 'Sections', component: SectionsListComponent },
    { path: '/sections/:id', name: 'SectionEdit', component: SectionEditComponent },
    { path: '/permissions', name: 'Permissions', component: PermissionsListComponent },
    { path: '/permissions/:id', name: 'PermissionEdit', component: PermissionEditComponent },
    { path: '/organizations', name: 'Organizations', component: OrganizationListComponent },
    { path: '/organizations/:organizationid', name: 'OrganizationEdit', component: OrganizationEditComponent },
    { path: '/organizations/:organizationid/departments/:departmentid', name: 'DepartmentEdit', component: DepartmentEditComponent },
    { path: '/organizations/:organizationid/departments/:departmentid/staffestablishedpost/:positionid', name: 'StaffEstablishedPostEdit', component: StaffEstablishedPostEditComponent },
    { path: '/sicklists', name: 'Sicklists', component: SicklistListComponent },
    { path: '/sicklists/:id', name: 'SicklistEdit', component: SicklistEditComponent }
])*/
// Async load a component using Webpack's require with es6-promise-loader and webpack `require`
// asyncRoutes is needed for our @angularclass/webpack-toolkit that will allow us to resolve
// the component correctly

export const asyncRoutes: AsyncRoutes = {
  // we have to use the alternative syntax for es6-promise-loader to grab the routes
  /*'About': require('es6-promise-loader!./about'),
  'Detail': require('es6-promise-loader!./+detail'),
  'Index': require('es6-promise-loader!./+detail'), // must be exported with detail/index.ts*/
};

// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
export const prefetchRouteCallbacks: Array<IdleCallbacks> = [
  /*asyncRoutes['About'],
  asyncRoutes['Detail'],*/
   // es6-promise-loader returns a function
];
