import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'
import {FormsModule} from '@angular/forms'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  signupUser:any={};
  theActualUser:any=null;
  loginUser:any={};
theError:any;
theMessage:any;

  constructor(private authService: AuthService) { }


tryToSignUp(){
  console.log(this.signupUser);
  this.authService.signup(this.signupUser)
  .subscribe(res=>{this.successCallback(res)},
    blaherrorthing=>{this.errorCallback(blaherrorthing)}
  );

}

tryToLogin(){
  this.authService.login(this.loginUser)
  .subscribe(res=>{this.successCallback(res)},
    blaherrorthing=>{this.errorCallback(blaherrorthing)}
  );

}

logMeOut(){
  this.authService.logout()
  .subscribe(res=>{this.theActualUser=null })
}

successCallback(userObject){
  this.theActualUser=userObject;
  this.theError=null;
  this.theMessage=null;
}

errorCallback(errorObject){
  this.theError=errorObject;
  this.theActualUser={};
}

checkIfLoggedIn(){
  this.authService.isLoggedIn()
  .subscribe(
    (res)=> this.successCallback(res)
    
    // err=>{this.errorCallback(null);
    // this.theMessage="You are not logged in"},
  );
}

  ngOnInit() {
this.checkIfLoggedIn()
  }

}
