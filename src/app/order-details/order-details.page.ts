import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { SystemServicesService } from '../services/system-services.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  constructor(private orderService: OrderService, private route: ActivatedRoute, private notificationService: SystemServicesService) { }
  orderId: number;
  order;
  mainImgUrl: string = "https://darhome.azurewebsites.net/"
  ngOnInit() {
    this.fetchOrderId();
  }
  fetchOrderId() {
    this.route.params.subscribe(param => {
      this.orderId = param.orderId
      this.getOrderDetails();
    })
  }
  getOrderDetails() {
    this.orderService.getOrderDetails(this.orderId).subscribe(res => {
      this.order = res;
      console.log(this.order)
    })
  }
  acceptOrder() {
    this.orderService.acceptOrder(this.orderId).subscribe(respnse => {
      this.notificationService.showMessage('تم بنجاح', 'تم قبول الطلب بنجاح','success');
      this.getOrderDetails()
    }, error => {
      this.notificationService.showMessage('حصل خطأ ', 'لم يتم قبول الطلب بنجاح','danger');
    })
  }
  rejectOrder() {
    this.orderService.rejectOrder(this.orderId).subscribe(respnse => {
      this.notificationService.showMessage('تم بنجاح', 'تم رفض الطلب بنجاح','success');
      this.getOrderDetails()
    }, error => {
      this.notificationService.showMessage('حصل خطأ ', 'لم يتم رفض الطلب بنجاح','danger');
    })
  }

}
