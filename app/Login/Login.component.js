System.register(['angular2/core', 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1;
    var Login;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            // login.js
            Login = (function () {
                // We inject the router via DI
                function Login(router) {
                    this.router = router;
                }
                Login.prototype.submit = function () {
                    var _this = this;
                    // This will be called when the user clicks on the Login button
                    event.preventDefault();
                    // We call our API to log the user in. The username and password are entered by the user
                    fetch('http://localhost:5000/connect/token', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            this: .username, this: .password
                        })
                    })
                        .then(status)
                        .then(json)
                        .then(function (response) {
                        // Once we get the JWT in the response, we save it into localStorage
                        localStorage.setItem('jwt', response.id_token);
                        // and then we redirect the user to the home
                        _this.router.parent.navigate('/home');
                    })
                        .catch(function (error) {
                        alert(error.message);
                        console.log(error.message);
                    });
                };
                Login = __decorate([
                    core_1.Component({
                        templateUrl: 'app/login/login.html',
                        selector: 'login'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], Login);
                return Login;
            }());
            exports_1("Login", Login);
        }
    }
});
//# sourceMappingURL=Login.component.js.map