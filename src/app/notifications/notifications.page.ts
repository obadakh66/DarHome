import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(private auth: AuthServiceService, private router: Router, private userServie: UserService) { }
  notifications;
  userId;
  errorMessage;
  ngOnInit() {
    this.userId = this.auth.getLoggedInUserId();
    this.getUserNotifications()
  }

  getUserNotifications() {
    this.userServie.getNotifications(this.userId).subscribe(res => {
      console.log(res)
      this.notifications = res
    }, error => {
      this.errorMessage = error.error
      console.log(this.errorMessage)
    })
  }
  getUserFullName(id,name){
    this.userServie.getFullName(id).subscribe(res=>{
      console.log(res)
      name= res;
      })
  }
  getTechFullName(id,name){
    this.userServie.getTechFullName(id).subscribe(res=>{
      console.log(res)
      name= res;
      })
  }
}
