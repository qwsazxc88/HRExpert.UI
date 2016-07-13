/*
 * These are globally available directives in any template
 */
// Angular 2
import { PLATFORM_DIRECTIVES } from '@angular/core';
// Angular 2 Router
import { ROUTER_DIRECTIVES } from '@angular/router';
// import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
// Angular 2 forms
// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
// ng2-bootstrap
import ng2b from 'ng2-bootstrap';
// application_directives: directives that are global through out the application
export const APPLICATION_DIRECTIVES = [
  ...ROUTER_DIRECTIVES,
  ...ng2b.directives,
  // ...
  // ...REACTIVE_FORM_DIRECTIVES
];

export const DIRECTIVES = [
  { provide: PLATFORM_DIRECTIVES, multi: true, useValue: APPLICATION_DIRECTIVES }
];
