import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.page.html',
  styleUrls: ['./order-success.page.scss'],
})
export class OrderSuccessPage implements OnInit {

  constructor(    private route: ActivatedRoute    ) { }
phoneNumber;
  ngOnInit() {
    this.route.params.subscribe(param=>{
      this.phoneNumber=param.phoneNumber
    })
  }

}
