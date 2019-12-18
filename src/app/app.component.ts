import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthServiceService } from './services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  currentUserId;
  isUser;
  appRenderedPages;
  isLoggedIn: boolean;
  public appLoggedPages = [
    {
      title: 'الصفحة الرئيسية',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'الملف الشخصي',
      url: '/profile',
      icon: 'contact'
    },
    {
      title: 'طلباتي',
      url: '/tech-orders',
      icon: 'reorder'
    },
    {
      title: 'تسجيل الخروج',
      url: '/logout',
      icon: 'exit_to_app'
    },
    {
      title: 'عن DarHome',
      url: '/about-us',
      icon: 'info'
    }
  ];
  public appNotLoggedPages = [
   
    {
      title: 'التسجيل',
      url: '/signup',
      icon: 'person-add'
    },
    {
      title: ' تسجيل الدخول كفني',
      url: '/login',
      icon: 'lock'
    },
    {
      title: 'تسجيل الدخول كمستخدم',
      url: '/login',
      icon: 'lock'
    },
    {
      title: 'عن DarHome',
      url: '/about-us',
      icon: 'info'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthServiceService
  ) {
    this.initializeApp();
  }
  ngOnInit() {

  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.checkLogin();
      console.log(this.authService.isLoggedin())
      if (this.authService.isLoggedin()==true) {
        let user = JSON.parse(localStorage.getItem("currentUser"));

        this.currentUserId = user.id;
        if (user.firstName) { this.isUser = false }
        else {
        this.isUser = true;
        }
        console.log(user);
        this.isLoggedIn = true;
      }
      else {
        this.isLoggedIn = false;
      }
    });
  }
  logout() {
    localStorage.clear()
    this.router.navigate(["/login"])
  }
}
