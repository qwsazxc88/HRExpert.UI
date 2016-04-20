export * from './app.service';
export * from './Users.service';
export * from './Roles.service';
export * from './Sections.service';
export * from './Permissions.service';
export * from './Organization.service';
export * from './Department.service';
export * from './Login.service';

import {AppState} from './app.service';
import {UsersService} from './Users.service';
import {RolesService} from './Roles.service';
import {SectionsService} from './Sections.service';
import {PermissionsService} from './Permissions.service';
import {OrganizationService} from './Organization.service';
import {DepartmentsService} from './Department.service';
import {LoginService} from './Login.service';

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  LoginService,
  UsersService,
  RolesService,
  SectionsService,
  PermissionsService,
  OrganizationService,
  DepartmentsService
];