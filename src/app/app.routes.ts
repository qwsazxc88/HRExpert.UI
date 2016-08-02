/** Async routes https://github.com/AngularClass/webpack-toolkit */
// import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { RouterConfig } from '@angular/router';
import * as C from './APP_COMPONENTS';
// import { NoContent } from './no-content';

// import { DataResolver } from './app.resolver';
import { AuthGuard } from './app.auth';

export const routes: RouterConfig = [
    { path: 'login', component: C.LoginComponent },
    /**
     * Маршруты требующие авторизации
     */
    { path: '', canActivate: [AuthGuard], component: C.MenuComponent , children: [
        { path: '',      component: C.Home },
        { path: 'users',
            children: [
                    { path: '', component: 'UsersListComponent' },
                    { path: ':id', component: 'UserEditComponent' }
                ]},
        { path: 'roles',
        children: [
                    { path: '', component: 'RolesListComponent' },
                    { path: ':id', component: 'RoleEditComponent' }
                ]},
        { path: 'sections',
        children: [
                    { path: '', component: 'SectionsListComponent' },
                    { path: ':id', component: 'SectionEditComponent' }
                ]},
        { path: 'permissions',
        children: [
                    { path: '',  component: 'PermissionsListComponent' },
                    { path: ':id', component: 'PermissionEditComponent' }
                ]},
        /*{ path: 'organizations',
        children: [
                    { path: '',  component: 'OrganizationsListComponent' },
                    { path: ':id', component: 'OrganizationEditComponent' }
                ]},*/
        { path: 'sicklists', // canActivate: [ WebpackAsyncRoute ],
            children: [
                { path: '', component: 'SicklistsListComponent' }, // must be included
                { path: ':id', component: 'SicklistEditComponent' }  // must be included
            ]},

        //        // { path: 'routePath',  component: C.TemplateComponent },
        //        // make sure you match the component type string to the require in asyncRoutes
        //        { path: 'about', component: 'About',
        //        resolve: {
        //        'yourData': DataResolver
        //    }},
        //    // async components with children routes must use WebpackAsyncRoute
        //    { path: 'detail', component: 'Detail',
        //    canActivate: [ WebpackAsyncRoute ],
        //    children: [
        //    { path: '', component: 'Index' }  // must be included
        // ]},
        // { path: '**',    component: NoContent },
    ]},
    /**
     * No route matched -- redirecting to home
     */
    { path: '**', redirectTo: '/' } // TODO: 404 page
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
    { path: '/organizations/:organizationid/departments/:departmentid/staffestablishedpost/:positionid',
        name: 'StaffEstablishedPostEdit', component: StaffEstablishedPostEditComponent },
    { path: '/sicklists', name: 'Sicklists', component: SicklistListComponent },
    { path: '/sicklists/:id', name: 'SicklistEdit', component: SicklistEditComponent }
])*/

// Async load a component using Webpack's require with es6-promise-loader and webpack `require`
// asyncRoutes is needed for our @angularclass/webpack-toolkit that will allow us to resolve
// the component correctly
export const asyncRoutes: AsyncRoutes = {
  // we have to use the alternative syntax for es6-promise-loader to grab the routes
  'UsersListComponent': require('es6-promise-loader!./users'),
  'UserEditComponent': require('es6-promise-loader!./users'),

  'RolesListComponent': require('es6-promise-loader!./roles'),
  'RoleEditComponent': require('es6-promise-loader!./roles'),

  'SectionsListComponent': require('es6-promise-loader!./sections'),
  'SectionEditComponent': require('es6-promise-loader!./sections'),

  'PermissionsListComponent': require('es6-promise-loader!./permissions'),
  'PermissionEditComponent': require('es6-promise-loader!./permissions'),

  'OrganizationsListComponent': require('es6-promise-loader!./organizations'),
  'OrganizationEditComponent': require('es6-promise-loader!./organizations'),

  'SicklistsListComponent': require('es6-promise-loader!./sicklist'),
  'SicklistEditComponent': require('es6-promise-loader!./sicklist'),
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
