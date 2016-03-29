System.register(["angular2/core", "angular2/http", "rxjs/Observable", 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1;
    var RolesService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {}],
        execute: function() {
            //@Injectable - декоратор, который передает данные о нашем сервисе.
            RolesService = (function () {
                function RolesService(http) {
                    this.http = http;
                    //так как у меня по разным ссылкам запрос и отправка данных, то я сделала 2 переменные с их указанием. Если вдруг что поменяется в ссылках, то мне не надо будет разыскивать по всему документу :) Удобно
                    this._getRoles = 'http://localhost:60729/api/Roles';
                    this._createRoles = 'http://localhost:60729/api/Roles';
                    this._editRoles = 'http://localhost:60729/api/Roles';
                }
                //запрашиваем все категории каталога 
                RolesService.prototype.getRoles = function () {
                    //обращаемся к API через get
                    return this.http.get(this._getRoles)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                RolesService.prototype.getRole = function (id) {
                    //обращаемся к API через get
                    return this.http.get(this._getRoles + '/' + id)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                RolesService.prototype.createRole = function (role) {
                    var body = JSON.stringify(role);
                    //устанавливаем нужный нам заголовок
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(this._createRoles, body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                RolesService.prototype.editRole = function (role) {
                    var body = JSON.stringify(role);
                    //устанавливаем нужный нам заголовок
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.put(this._editRoles, body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                RolesService.prototype.handleError = function (error) {
                    //in a real world app, we may send the error to some remote logging infrastructure
                    //instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                RolesService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], RolesService);
                return RolesService;
            }());
            exports_1("RolesService", RolesService);
        }
    }
});
//# sourceMappingURL=Roles.service.js.map