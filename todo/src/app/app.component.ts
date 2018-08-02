import { Component, OnInit } from '@angular/core';
import {AuthService} from './services/auth.service'
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  signupUser:any={};
  theActualUser:any=null;
  loginUser:any={};
theError:any;
theMessage:any;
constructor(private authService: AuthService) { }


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
  .subscribe
    (res=>{this.successCallback(res)},
    err=>{this.errorCallback(err);
    this.theMessage="You are not logged in"}
  );
}

  ngOnInit() {
this.checkIfLoggedIn()
  }

}



