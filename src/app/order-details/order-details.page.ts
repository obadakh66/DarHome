import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  constructor(private orderService: OrderService, private route: ActivatedRoute) { }
  orderId: number;
  order;
  ngOnInit() {
  }
  fetchOrderId() {
    this.route.params.subscribe(param => {
      this.orderId = param.orderId
    })
  }
  getOrderDetails() {
    this.orderService.getOrderDetails(this.orderId).subscribe(res => {
      this.order = res;
    })
  }

}
