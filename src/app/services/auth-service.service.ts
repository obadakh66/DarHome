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



  async checkLogin() {
    let currentUSer = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUSer) {
      if (currentUSer.firstName) {
        this.router.navigate(["/tech-orders/" + currentUSer.id]);
      }
      else {
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
    //this.storage.remove("jwt");
    this.router.navigate(["/login"])
  }
}
