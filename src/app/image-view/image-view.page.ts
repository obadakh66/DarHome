import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SystemServicesService } from '../services/system-services.service';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.page.html',
  styleUrls: ['./image-view.page.scss'],
})
export class ImageViewPage implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private userServie: UserService, private notifyService: SystemServicesService) { }
  techId;
  tech;
  mainImgUrl: string = "https://darhomeapis.azurewebsites.net"

  ngOnInit() {
    this.fetchOrderId();
  }
  fetchOrderId() {
    this.route.params.subscribe(param => {
      this.techId = param.techId
      this.getTechDetails();
    })
  }
  getTechDetails() {
    this.userServie.getTechnicianDetialsById(this.techId).subscribe(res => {
      this.tech = res;
      console.log(this.tech)
    })
  }
  acceptRequest(techId) {
    this.userServie.acceptTechRequest(techId).subscribe(res => {
      this.notifyService.showMessage('تم بنجاح', 'تم قبول التقني بنجاح', 'success')
      location.assign('/admin')
    })
  }
}
