import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SystemServicesService } from '../services/system-services.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
})
export class NewOrderPage implements OnInit {
providerNumber;
  constructor(private route: ActivatedRoute,
    private systemService: SystemServicesService,
    private auth: AuthServiceService,
    private router:Router,
    private orderService: OrderService) { }


  ngOnInit() {
    this.fetchCategoryId();
    this.getTechniciansByCategoryType();
    this.userId=this.auth.getLoggedInUserId();
    console.log(this.userId)
  }
  mainCategoryId: number;
  subCategories;
  userId: number;
  technicians;
  orderImage;
  isFirstStep: boolean = true;
  isSecondStep: boolean = false;
  public isLoading = true;
  imageProcessing: boolean = false;
  orderForm = new FormGroup({
    unitType: new FormControl('', Validators.required),
    subCategoryId: new FormControl('', Validators.required),
    details: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    technicianId: new FormControl('', Validators.required)
  });

  get unitType() {
    return this.orderForm.get('unitType') as FormControl;
  }
  get subCategoryId() {
    return this.orderForm.get('subCategoryId') as FormControl;
  }
  get details() {
    return this.orderForm.get('details') as FormControl;
  }
  get location() {
    return this.orderForm.get('location') as FormControl;
  }
  get technicianId() {
    return this.orderForm.get('technicianId') as FormControl;
  }



  fetchCategoryId() {
    this.route.params.subscribe(param => {
      this.mainCategoryId = param.categoryId
      console.log(this.mainCategoryId)
      this.getsubCategories(this.mainCategoryId);
    })
  }
  getsubCategories(mainCategoryId) {
    this.orderService.getSubCategories(mainCategoryId).subscribe(res => {
      this.subCategories = res;
      console.log(this.subCategories)
    })
  }

  uploadImage(str: any) {
    this.imageProcessing = true
    this.orderImage = str.target.files[0];
  }
  getTechniciansByCategoryType() {
    this.orderService.getTechniciansByCategoryType(this.mainCategoryId).subscribe(res => {
      this.technicians = res;
      console.log(this.technicians)
    })
  }
  setProviderNumber(number){
    this.providerNumber=number;
    console.log(this.providerNumber)
  }
  createOrder() {   
    let newOrder = {
      categoryId:Number(this.mainCategoryId),
      subCategoryId: this.subCategoryId.value,
      unitType:Number( this.unitType.value),
      details: this.details.value,
      location: this.location.value,
      technicianId: this.technicianId.value,
      userId: this.userId,
      image:""
    }
console.log(newOrder)
    this.orderService.createOrder(newOrder).subscribe(res => {
      this.uploadOrderImage(res.id);
    })
  }
  uploadOrderImage(id) {
    this.orderService.uploadOrderImage(id, this.orderImage).subscribe(res => {
      this.systemService.showMessage('تم الإرسال', 'تم إرسال طلبك بنجاح', 'success')
      this.router.navigate(["/order-success/"+this.providerNumber])

    }, error => {
      this.systemService.showMessage('حصل خطأ', 'لم يتم إرسال طلبك بنجاح', 'danger')
    })
  }
}
