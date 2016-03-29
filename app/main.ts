import {bootstrap}    from 'angular2/platform/browser';
import {UIAppComponent} from './app.component';
import {HTTP_PROVIDERS} from 'angular2/http';
import {NgClass} from 'angular2/common';
bootstrap(UIAppComponent,[HTTP_PROVIDERS]);
