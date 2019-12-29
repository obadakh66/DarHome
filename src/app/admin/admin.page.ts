import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SystemServicesService } from '../services/system-services.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private userService: UserService, private router: Router,private notifyService:SystemServicesService) { }
  requests;
  ngOnInit() {
    this.getAllRequests();
  }
  getAllRequests() {
    this.userService.getTechRequests().subscribe(res => {
      this.requests = res;
    })
  }
  acceptRequest(techId){
    this.userService.acceptTechRequest(techId).subscribe(res=>{
      this.notifyService.showMessage('تم بنجاح','تم قبول التقني بنجاح','success')
      this.getAllRequests();
    })
  }

}
