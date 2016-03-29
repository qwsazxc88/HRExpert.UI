System.register(['angular2/core', 'angular2/router', "./Users.service"], function(exports_1, context_1) {
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
    var core_1, router_1, Users_service_1;
    var UsersListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Users_service_1_1) {
                Users_service_1 = Users_service_1_1;
            }],
        execute: function() {
            UsersListComponent = (function () {
                function UsersListComponent(_usersService, _router) {
                    this._usersService = _usersService;
                    this._router = _router;
                }
                UsersListComponent.prototype.ngOnInit = function () {
                    this.getUsers();
                };
                //обращаемся к созданному нами сервису
                UsersListComponent.prototype.getUsers = function () {
                    var _this = this;
                    this._usersService.getUsers()
                        .subscribe(function (users) { _this.users = users; }, function (error) { return _this.errorMessage = error; });
                };
                UsersListComponent.prototype.gotoEdit = function (user) {
                    var link = ['UserEdit', { id: user.Id }];
                    this._router.navigate(link);
                };
                UsersListComponent.prototype.gotoCreate = function () {
                    var link = ['UserEdit', { id: 0 }];
                    this._router.navigate(link);
                };
                UsersListComponent = __decorate([
                    core_1.Component({
                        selector: 'users-list',
                        template: "   \n<div class=\"row\">\n    <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n        <div class=\"x_panel \">\t\n\t\t<button class=\"btn btn-default\" (click)=\"gotoCreate()\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>\n\t<table class=\"table table-bordered table-striped\">\n\t<thead>\n\t<tr><th>Id</th><th>\u0418\u043C\u044F</th></tr>\n\t</thead>\n\t<tbody>\n\t<tr *ngFor=\"#user of users\" (click)=\"gotoEdit(user)\"><td>{{user.Id}}</td><td>{{user.Name}}</td></tr>\n\t</tbody>\n\t</table>\n\t</div></div></div>\n    ",
                        providers: [Users_service_1.UsersService]
                    }), 
                    __metadata('design:paramtypes', [Users_service_1.UsersService, router_1.Router])
                ], UsersListComponent);
                return UsersListComponent;
            }());
            exports_1("UsersListComponent", UsersListComponent);
        }
    }
});
//# sourceMappingURL=UsersList.component.js.map