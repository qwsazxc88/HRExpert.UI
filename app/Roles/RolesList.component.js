System.register(['angular2/core', "./Roles.service", 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, Roles_service_1, router_1;
    var RolesListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Roles_service_1_1) {
                Roles_service_1 = Roles_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            RolesListComponent = (function () {
                function RolesListComponent(_rolesService, _router) {
                    this._rolesService = _rolesService;
                    this._router = _router;
                }
                RolesListComponent.prototype.ngOnInit = function () {
                    this.getRoles();
                };
                //обращаемся к созданному нами сервису
                RolesListComponent.prototype.getRoles = function () {
                    var _this = this;
                    this._rolesService.getRoles()
                        .subscribe(function (roles) { _this.roles = roles; }, function (error) { return _this.errorMessage = error; });
                };
                RolesListComponent.prototype.gotoEdit = function (role) {
                    var link = ['RoleEdit', { id: role.Id }];
                    this._router.navigate(link);
                };
                RolesListComponent.prototype.gotoCreate = function () {
                    var link = ['RoleEdit', { id: 0 }];
                    this._router.navigate(link);
                };
                RolesListComponent = __decorate([
                    core_1.Component({
                        selector: 'roles-list',
                        template: "\n<div class=\"row\">\n    <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n        <div class=\"x_panel \">  \n\t<button class=\"btn btn-default\" (click)=\"gotoCreate()\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>\t\t\n\t<table class=\"table table-bordered table-striped\">\n\t<thead>\n\t<tr><th>Id</th><th>\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435</th></tr>\n\t</thead>\n\t<tbody>\n\t<tr *ngFor=\"#role of roles\" (click)=\"gotoEdit(role)\"><td>{{role.Id}}</td><td>{{role.Name}}</td></tr>\n\t</tbody>\n\t</table>\n\t</div></div></div>\n    ",
                        providers: [Roles_service_1.RolesService]
                    }), 
                    __metadata('design:paramtypes', [Roles_service_1.RolesService, router_1.Router])
                ], RolesListComponent);
                return RolesListComponent;
            }());
            exports_1("RolesListComponent", RolesListComponent);
        }
    }
});
//# sourceMappingURL=RolesList.component.js.map