//Vendor libs
import {Component, Input, Output, EventEmitter, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import {MdButton, MdAnchor} from '@angular2-material/button';
import {MdToolbar} from '@angular2-material/toolbar';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdRadioButton,MdRadioChange,MdRadioDispatcher,MdRadioGroup} from '@angular2-material/radio';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
//Libs
import {ApiConnector} from "../../ApiConnector/ApiConnector";
import {Login} from "../../Model/Login";
import {Profile} from "../../Model/Profile";
import {TokenHelper} from "../../Tools/TokenHelper"
@Component({
	template: require('./Login.html'),    
    selector: 'login',
    directives: [MD_INPUT_DIRECTIVES,MdButton],
	providers: [ApiConnector]
})
export class LoginComponent implements OnInit{
  constructor(private router: Router, private Api: ApiConnector) {
  this.Model = new Login();
  this.tokenHelper = new TokenHelper();  
  }
  @Input() jwt:string;
  @Output() jwtChange = new EventEmitter ();
  tokenHelper:TokenHelper;
  @Input() decodedJwt:any;
  @Output() decodedJwtChange = new EventEmitter();
  @Input() profile:Profile;
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
    this.Api.Login.login(this.Model).subscribe(
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
      this.Api.Users.Profile().subscribe(
          data=>{this.profile=data; this.profileChange.emit(this.profile)},
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
      if(this.jwt)
        {
            let exp = this.tokenHelper.isTokenExpired(this.jwt);
            if(exp) this.logout();   
        }
       setTimeout(()=>{this.checkExpiration();},5000); 
  }
}