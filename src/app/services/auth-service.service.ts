import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';

const tokenSoapLink = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";

@Injectable()
export class AuthServiceService {

  constructor(private jwtService: JwtHelperService, private router: Router) { }
  getLoggedInUserId() {
    if (this.isLoggedin()) {
      let userId = JSON.parse(localStorage.getItem("currentUser")).id;
      return userId;
    }
    return 0;
  } 
  getLoggedInUser() {
    if (this.isLoggedin()) {
      let userId = JSON.parse(localStorage.getItem("currentUser"));
      return userId;
    }
    return 0;
  }
  async checkLogin() {
    let currentUSer = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUSer) {
      if (currentUSer.firstName) {
        this.router.navigate(["/tech-orders/" + currentUSer.id]);
      }
      else if(currentUSer.isAdmin){
        this.router.navigate(["/admin"]);
      }
      else{
        this.router.navigate(["/home"]);
      }
      return true;
    }
    else {
      this.router.navigate(["/login"]);
      console.log(false)
      return false;
    }
  }
   isLoggedin() {
    let currentUSer = localStorage.getItem("currentUser");
    if (currentUSer!=null) {
      return true;
    }
    else {
      return false;
    }
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(["/login"])
  }
}
