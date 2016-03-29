System.register(['angular2/core', "./Roles.service", 'angular2/router', "../Classes/Role"], function(exports_1, context_1) {
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
    var core_1, Roles_service_1, router_1, Role_1;
    var RoleEditComponent;
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
            },
            function (Role_1_1) {
                Role_1 = Role_1_1;
            }],
        execute: function() {
            RoleEditComponent = (function () {
                function RoleEditComponent(_rolesService, _routeParams) {
                    this._rolesService = _rolesService;
                    this._routeParams = _routeParams;
                }
                RoleEditComponent.prototype.ngOnInit = function () {
                    var id = this._routeParams.get('id');
                    if (id > 0) {
                        this.getRole(id);
                    }
                    else {
                        this.role = new Role_1.Role();
                        this.role.Id = 0;
                    }
                };
                RoleEditComponent.prototype.saveRole = function () {
                    var _this = this;
                    var data = this.role;
                    if (data.Id > 0) {
                        this._rolesService.editRole(data)
                            .subscribe(function (role) { _this.role = role; }, function (error) { return _this.errorMessage = error; });
                    }
                    else {
                        this._rolesService.createRole(data)
                            .subscribe(function (role) { _this.role = role; }, function (error) { return _this.errorMessage = error; });
                    }
                };
                //обращаемся к созданному нами сервису
                RoleEditComponent.prototype.getRole = function (id) {
                    var _this = this;
                    this._rolesService.getRole(id)
                        .subscribe(function (role) { _this.role = role; }, function (error) { return _this.errorMessage = error; });
                };
                __decorate([
                    core_1.Input, 
                    __metadata('design:type', Role_1.Role)
                ], RoleEditComponent.prototype, "role", void 0);
                RoleEditComponent = __decorate([
                    core_1.Component({
                        selector: 'roles-edit',
                        template: "<div class=\"row\">\n    <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n        <div class=\"x_panel \">\t  \n\t<div *ngIf=\"role\">\n\t<div class=\"form-group\">\n\t  <label>Id:</label>\n\t  <span>{{role.Id}}</span>\n\t</div>\t\n\t<div class=\"form-group\">\n\t  <label>\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435:</label>\n\t  <input type=\"text\" class=\"form-control\" [(ngModel)]=\"role.Name\" placeholder=\"name\">\n\t</div>\n\t</div>\n\t<button class=\"btn btn-default\" (click)=\"saveRole()\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>\n\t</div></div></div>\n    ",
                        providers: [Roles_service_1.RolesService]
                    }), 
                    __metadata('design:paramtypes', [Roles_service_1.RolesService, router_1.RouteParams])
                ], RoleEditComponent);
                return RoleEditComponent;
            }());
            exports_1("RoleEditComponent", RoleEditComponent);
        }
    }
});
//# sourceMappingURL=RoleEdit.component.js.map