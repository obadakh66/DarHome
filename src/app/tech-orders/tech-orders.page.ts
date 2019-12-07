import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemServicesService } from '../services/system-services.service';

@Component({
  selector: 'app-tech-orders',
  templateUrl: './tech-orders.page.html',
  styleUrls: ['./tech-orders.page.scss'],
})
export class TechOrdersPage implements OnInit {
  technicianId: number;
  orders;
  acceptedOrders;
  rejectedOrders;
  pendingOrders;
  constructor(private orderService: OrderService,
    private router:Router,
    private notificationService:SystemServicesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchTechnicianId();
  }

  fetchTechnicianId() {
    this.route.params.subscribe(res => {
      this.technicianId = res.techId
      this.getOrdersByTechnicianId()
    })
  }

  getOrdersByTechnicianId() {
    this.orderService.getOrdersForTechnician(this.technicianId).subscribe(res => {
      this.orders = res;
      this.acceptedOrders=this.orders.filter(x=>x.orderStatus==2)
      this.pendingOrders=this.orders.filter(x=>x.orderStatus==1)
      this.rejectedOrders=this.orders.filter(x=>x.orderStatus==3)
      console.log(this.orders)
    }) 
  }
  acceptOrder(id) {
    this.orderService.acceptOrder(id).subscribe(respnse => {
      this.notificationService.showMessage('تم بنجاح', 'تم قبول الطلب بنجاح','success');
      this.getOrdersByTechnicianId()
    }, error => {
      this.notificationService.showMessage('حصل خطأ ', 'لم يتم قبول الطلب بنجاح','danger');
    })
  }
  rejectOrder(id) {
    this.orderService.rejectOrder(id).subscribe(respnse => {
      this.notificationService.showMessage('تم بنجاح', 'تم رفض الطلب بنجاح','success');
      this.getOrdersByTechnicianId()
    }, error => {
      this.notificationService.showMessage('حصل خطأ ', 'لم يتم رفض الطلب بنجاح','danger');
    })
  }
}
