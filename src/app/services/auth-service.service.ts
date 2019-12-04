import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';

const tokenSoapLink = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";

@Injectable()
export class AuthServiceService {

  constructor(private jwtService: JwtHelperService, private router: Router) { }
  getLoggedInUserId() {
  if(this.isLoggedin()){
    let userId=JSON.parse(localStorage.getItem("currentUser")).id;
    return userId;
  }
  return 0;
  }

  

  async checkLogin() {
   let currentUSer=localStorage.getItem("currentUser");
    if(currentUSer){
      this.router.navigate(["/home"]);
    return true;
    }
   else{
    this.router.navigate(["/login"]);
     console.log(false)
   return false;
   }
  }
  async isLoggedin() {
    let currentUSer=localStorage.getItem("currentUser");
     if(currentUSer){
     return true;
     }
    else{
    return false;
    }
   }

  Logout() {
    //this.storage.remove("jwt");
    this.router.navigate(["/login"])
  }
}
