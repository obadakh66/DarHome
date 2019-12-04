import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  currentUserId;
  isUser;
  public appPages = [
    {
      title: 'الصفحة الرئيسية',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'التسجيل',
      url: '/signup',
      icon: 'person-add'
    },
    {
      title: 'تسجيل الدخول',
      url: '/login',
      icon: 'lock'
    },
    {
      title: 'الملف الشخصي',
      url: '/profile',
      icon: 'contact'
    },
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService:AuthServiceService
  ) {
    this.initializeApp();
  }
ngOnInit(){

}
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.isLoggedin();
      if(this.authService.isLoggedin()){
        let user= JSON.parse(localStorage.getItem("currentUser"));

        this.currentUserId =user.id;
        user.firstName ? this.isUser= false :this.isUser= true;
        console.log(user);
      }
    });
  }
}
