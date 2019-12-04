import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://www.letsridein.com/api/Notifications/'
const getNotificationsRoute = 'GetNotifications/';
@Injectable()
export class NotificationService {

  constructor(private http: HttpClient) {

  }

  getUserNotification(userId) {
    return this.http.get(baseUrl + getNotificationsRoute + userId);
  }

  
}
