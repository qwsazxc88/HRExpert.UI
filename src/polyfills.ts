// Polyfills

// import 'ie-shim'; // Internet Explorer 9 support

// import 'core-js/es6';
// Added parts of es6 which are necessary for your project or your browser support requirements.
/*import 'core-js/es6/symbol'; // NOTE FIXME BUG HACK
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/weak-map';
import 'core-js/es6/weak-set';
import 'core-js/es6/typed';
import 'core-js/es6/reflect';*/
// see issue https://github.com/AngularClass/angular2-webpack-starter/issues/709
// import 'core-js/es6/promise';

import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

// Typescript emit helpers polyfill
import 'ts-helpers';

if ('production' === ENV) {
    // Production
    require('core-js/es6/symbol'); /*// NOTE FIXME BUG HACK */
    require('core-js/es6/object');
    require('core-js/es6/function');
    require('core-js/es6/parse-int');
    require('core-js/es6/parse-float');
    require('core-js/es6/number');
    require('core-js/es6/math');
    require('core-js/es6/string');
    require('core-js/es6/date');
    require('core-js/es6/array');
    require('core-js/es6/regexp');
    require('core-js/es6/map');
    require('core-js/es6/set');
    require('core-js/es6/weak-map');
    require('core-js/es6/weak-set');
    require('core-js/es6/typed');
    require('core-js/es6/reflect');

} else {
    // Development

    Error.stackTraceLimit = Infinity;

    require('zone.js/dist/long-stack-trace-zone');
}
