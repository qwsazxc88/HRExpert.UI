import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "angular2/router";
import {HomePageComponent} from "./HomePage/HomePage.component"
import {UsersListComponent} from "./Users/UsersList.component";
import {UserEditComponent} from "./Users/UserEdit.component";
import {RolesListComponent} from "./Roles/RolesList.component";
import {RoleEditComponent} from "./Roles/RoleEdit.component";
import {Login} from "./Login/Login.component";

@Component({
    selector: '[ui-app]',
    template: `<div class="container body">
    <div class="main_container">
      <div class="col-md-3 left_col">
        <div class="left_col scroll-view">
          <div class="navbar nav_title" style="border: 0;">
            <a href="index.html" class="site_title">
                <object type="image/svg+xml" data="/images/logo.svg" style="margin-top:3px;" width="50" height="50"></object><span style="vertical-align:top;font-family:'Times New Roman', Times, serif">Русконсалт</span></a>
          </div>
          <div class="clearfix"></div>

          <!-- menu prile quick info -->
          <div class="profile">
            <div class="profile_pic">
              <img src="/images/user.png" alt="..." class="img-circle profile_img">
            </div>
            <div class="profile_info">
              <span>Привет,</span>
              <h2>Артём Баранов</h2>
            </div>
          </div>
          <!-- /menu prile quick info -->

          <br />

          <!-- sidebar menu -->
          <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">

            <div class="menu_section">
              <h3>Меню</h3>
              <ul class="nav side-menu">
                <li><a [routerLink]="['HomePage']">Главная</a>
                    </li>
                    <li><a [routerLink]="['UsersList']">Пользователи</a>
                    </li>
					<li><a [routerLink]="['Login']">Вход</a>
                    </li>
                    <li><a [routerLink]="['RolesList']">Роли</a>
                
              </ul>
            </div>

          </div>
          <!-- /sidebar menu -->

          <!-- /menu footer buttons -->
          <div class="sidebar-footer hidden-small">
            <a data-toggle="tooltip" data-placement="top" title="Settings">
              <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
            </a>
            <a data-toggle="tooltip" data-placement="top" title="FullScreen">
              <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
            </a>
            <a data-toggle="tooltip" data-placement="top" title="Lock">
              <span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
            </a>
            <a data-toggle="tooltip" data-placement="top" title="Logout">
              <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
            </a>
          </div>
          <!-- /menu footer buttons -->
        </div>
      </div>

      <!-- top navigation -->
      <div class="top_nav">

        <div class="nav_menu">
          <nav class="" role="navigation">
            <div class="nav toggle">
              <a id="menu_toggle"><i class="fa fa-bars"></i></a>
            </div>

            <ul class="nav navbar-nav navbar-right">
              <li class="">
                <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                  <img src="/images/user.png" alt="">Артём Баранов
                  <span class=" fa fa-angle-down"></span>
                </a>
                <ul class="dropdown-menu dropdown-usermenu animated fadeInDown pull-right">
                  <li><a href="javascript:;">  Profile</a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <span class="badge bg-red pull-right">50%</span>
                      <span>Settings</span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">Help</a>
                  </li>
                  <li><a href="login.html"><i class="fa fa-sign-out pull-right"></i> Log Out</a>
                  </li>
                </ul>
              </li>

              <li role="presentation" class="dropdown">
                <a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                  <i class="fa fa-envelope-o"></i>
                  <span class="badge bg-green">6</span>
                </a>
                <ul id="menu1" class="dropdown-menu list-unstyled msg_list animated fadeInDown" role="menu">
                  <li>
                    <a>
                      <span class="image">
                                        <img src="images/img.jpg" alt="Profile Image" />
                                    </span>
                      <span>
                                        <span>John Smith</span>
                      <span class="time">3 mins ago</span>
                      </span>
                      <span class="message">
                                        Film festivals used to be do-or-die moments for movie makers. They were where...
                                    </span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span class="image">
                                        <img src="images/img.jpg" alt="Profile Image" />
                                    </span>
                      <span>
                                        <span>John Smith</span>
                      <span class="time">3 mins ago</span>
                      </span>
                      <span class="message">
                                        Film festivals used to be do-or-die moments for movie makers. They were where...
                                    </span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span class="image">
                                        <img src="/images/img.jpg" alt="Profile Image" />
                                    </span>
                      <span>
                                        <span>John Smith</span>
                      <span class="time">3 mins ago</span>
                      </span>
                      <span class="message">
                                        Film festivals used to be do-or-die moments for movie makers. They were where...
                                    </span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span class="image">
                                        <img src="/images/img.jpg" alt="Profile Image" />
                                    </span>
                      <span>
                                        <span>John Smith</span>
                      <span class="time">3 mins ago</span>
                      </span>
                      <span class="message">
                                        Film festivals used to be do-or-die moments for movie makers. They were where...
                                    </span>
                    </a>
                  </li>
                  <li>
                    <div class="text-center">
                      <a href="inbox.html">
                        <strong>See All Alerts</strong>
                        <i class="fa fa-angle-right"></i>
                      </a>
                    </div>
                  </li>
                </ul>
              </li>

            </ul>
          </nav>
        </div>

      </div>
      <!-- /top navigation -->


      <!-- page content -->
      <div class="right_col" style="background-image: url('/images/cover.svg');background-size: 50%;background-position: center;background-repeat: no-repeat;" role="main">
          <div class="row" style="margin-bottom:5px;">
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div id="Title" class="pull-left" style="background: #fff; padding: 5px 10px; border: 1px solid #ccc">
                      <i class="fa fa-angle-right"></i>
                      <span>@ViewBag.Title</span>
                  </div>
              </div>
              <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div id="CurrentDate" class="pull-right" style="background: #fff; padding: 5px 10px; border: 1px solid #ccc">
                      <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>
                      <span>{{CurrentDate| date:'yMMMMd'}}</span>
                  </div>
              </div>
          </div>
          <div class="row">              
                    <router-outlet></router-outlet>
                </div>



                <!-- footer content -->
                <!-- /footer content -->
            </div>
            <!-- /page content -->

        </div>

    </div>
`,
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
    {
        path: '/',
        name: 'HomePage',
        component: HomePageComponent,
        useAsDefault: true
    },

    {
        path: '/users',
        name: 'UsersList',
        component: UsersListComponent
    },
	
	{
        path: '/roles',
        name: 'RolesList',
        component: RolesListComponent
    },
	
	{
	  path: '/users/:id',
	  name: 'UserEdit',
	  component: UserEditComponent
	},
	
	{
	  path: '/roles/:id',
	  name: 'RoleEdit',
	  component: RoleEditComponent
	},
	
	{
	  path: '/login',
	  name: 'Login',
	  component: Login
	}
	
])
export class UIAppComponent { 
	constructor(){$(".right_col").css("min-height", $(window).height());}
	CurrentDate = new Date();
}