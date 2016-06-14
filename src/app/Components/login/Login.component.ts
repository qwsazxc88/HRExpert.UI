//Vendor libs
import {Component, Input, Output, EventEmitter, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {HTTP_PROVIDERS } from '@angular/http';

//Libs
import {MD_COMPONENTS} from '../';
import {API} from '../../Services';
import {Login, Profile} from '../../Model';
import {TokenHelper} from '../../Tools/Token/TokenHelper';
import {} from '../../'
@Component({
    template: require('../../Views/login/Login.html'),
    selector: 'login',
    directives: [MD_COMPONENTS],
    providers: [API,HTTP_PROVIDERS ]
})
export class LoginComponent implements OnInit{
  constructor(private router: Router, private Api: API) {
    this.Model = new Login();
    this.tokenHelper = new TokenHelper();
  }
  tokenHelper : TokenHelper;
  @Input() jwt : string;
  @Input() decodedJwt : any;
  @Input() profile : Profile;
  @Output() jwtChange = new EventEmitter ();
  @Output() decodedJwtChange = new EventEmitter();  
  @Output() profileChange = new EventEmitter();
  errorMessage : string;
  Model : Login;
  ngOnInit() {
      this.checkExpiration();
      if(this.jwt)
      {
          this.decodedJwt = this.tokenHelper.decodeToken(this.jwt);
          this.decodedJwtChange.emit(this.decodedJwt);
          this.getProfile();
      }
    }
  submit() {
    this.Api.login(this.Model).subscribe(
                    jwt => {
                        localStorage.setItem('jwt', jwt);
                        this.jwt = jwt;
                        this.jwtChange.emit(this.jwt);
                        this.decodedJwt = this.tokenHelper.decodeToken(jwt);
                        this.decodedJwtChange.emit(this.decodedJwt);
                        this.getProfile();
                    },
                    error => this.errorMessage = <any>error
                );
  }
  getProfile()
  {
      this.Api.profile().subscribe(
          data => {this.profile=data; this.profileChange.emit(this.profile)},
          error => this.errorMessage = <any>error
      )
  }
  logout()
  {
      this.jwt = null;
      this.jwtChange.emit(this.jwt);
      localStorage.removeItem('jwt');
  }
  checkExpiration()
  {
      if (this.jwt)
        {
            let exp = this.tokenHelper.isTokenExpired(this.jwt);
            if (exp) this.logout();
        }
       setTimeout( () => {this.checkExpiration();}, 5000); 
  }
}