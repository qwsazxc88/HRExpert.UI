System.register(['angular2/core', "./Users.service", 'angular2/router', "../Classes/User"], function(exports_1, context_1) {
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
    var core_1, Users_service_1, router_1, User_1;
    var UserEditComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Users_service_1_1) {
                Users_service_1 = Users_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (User_1_1) {
                User_1 = User_1_1;
            }],
        execute: function() {
            UserEditComponent = (function () {
                function UserEditComponent(_usersService, _routeParams) {
                    this._usersService = _usersService;
                    this._routeParams = _routeParams;
                }
                UserEditComponent.prototype.ngOnInit = function () {
                    var id = this._routeParams.get('id');
                    if (id > 0) {
                        this.getUser(id);
                    }
                    else {
                        this.user = new User_1.User();
                        this.user.Id = 0;
                    }
                };
                UserEditComponent.prototype.saveUser = function () {
                    var _this = this;
                    var data = this.user;
                    if (this.user.Id > 0) {
                        this._usersService.editUser(data)
                            .subscribe(function (user) { _this.user = user; }, function (error) { return _this.errorMessage = error; });
                    }
                    else {
                        this._usersService.createUser(data)
                            .subscribe(function (user) { _this.user = user; }, function (error) { return _this.errorMessage = error; });
                    }
                };
                //обращаемся к созданному нами сервису
                UserEditComponent.prototype.getUser = function (id) {
                    var _this = this;
                    this._usersService.getUser(id)
                        .subscribe(function (user) { _this.user = user; }, function (error) { return _this.errorMessage = error; });
                };
                __decorate([
                    core_1.Input, 
                    __metadata('design:type', User_1.User)
                ], UserEditComponent.prototype, "user", void 0);
                UserEditComponent = __decorate([
                    core_1.Component({
                        selector: 'users-edit',
                        template: "<div class=\"row\">\n    <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n        <div class=\"x_panel \">\t  \n\t<div *ngIf=\"user\">\n\t<div class=\"form-group\">\n\t  <label>Id:</label>\n\t  <span>{{user.Id}}</span>\n\t</div>\t\n\t<div class=\"form-group\">\n\t  <label>\u0418\u043C\u044F:</label>\n\t  <input type=\"text\" class=\"form-control\" [(ngModel)]=\"user.Name\" placeholder=\"name\">\n\t</div>\n\t</div>\n\t<button class=\"btn btn-default\" (click)=\"saveUser()\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>\n\t</div></div></div>\n    ",
                        providers: [Users_service_1.UsersService]
                    }), 
                    __metadata('design:paramtypes', [Users_service_1.UsersService, router_1.RouteParams])
                ], UserEditComponent);
                return UserEditComponent;
            }());
            exports_1("UserEditComponent", UserEditComponent);
        }
    }
});
//# sourceMappingURL=UserEdit.component.js.map