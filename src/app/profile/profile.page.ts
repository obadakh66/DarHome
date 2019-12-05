import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RateDialogPage } from '../rate-dialog/rate-dialog/rate-dialog.page';
import { UserService } from '../services/user.service';
import { Category } from '../home/categories';
import { SystemServicesService } from '../services/system-services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private authService: AuthServiceService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private userService: UserService,
    private notificationService:SystemServicesService,
    private router: Router) { }
  currentUserId: number;
  passedUserId: number;
  currentUser;
  loggedInUser;
  isUser;
  isOwner;
  ngOnInit() {

    this.fetchPassedUserId();
  }

  isLoggedIn() {
    this.authService.isLoggedin();
  }
  fetchPassedUserId() {

    this.route.params.subscribe(param => {
      this.passedUserId = param.id;
      this.isOwner = param.isOwner;
      this.isUser = param.isUser;
      console.log(this.isOwner, this.isUser)
      if (this.isUser == 'true') {
        this.getUserById();
      }
      if (this.isUser == 'false') {
        this.getTechnicianById();
      }
    })
  }
  getUserById() {
    this.userService.getUserDetialsById(this.passedUserId).subscribe(res => {
      console.log(res)
      this.currentUser = res;
    })
  }
  getTechnicianById() {
    console.log(this.isUser)
    this.userService.getTechnicianDetialsById(this.passedUserId).subscribe(res => {
      console.log(res)
      this.currentUser = res;
    })
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RateDialogPage, {
      width: '350px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.createRate(result);
      }
    });
  }
  allCategories: Category = new Category();

  getCategoryName(id) {
    if (id) {
      let category = this.allCategories.categories.find(x => x.id == id);
      return category.name;
    }
    return ''

  }
  getCategoryImage(id) {
    let category = this.allCategories.categories.find(x => x.id == id);
    return category.imageUrl;
  }
  createRate(rateValue) {
    let newRate = {
      rateValue: rateValue,
      ratedUserId: this.currentUser.id,
      userId: this.authService.getLoggedInUserId()
    }
    console.log(newRate)

    this.userService.createRate(newRate).subscribe(response=>{
      this.notificationService.showMessage('تم بنجاح', 'تم التقييم بنجاح','success');
      this.ngOnInit();
    }, error => {
      this.notificationService.showMessage('حصل خطأ ', 'لم يتم التقييم بنجاح','danger');
    })
  }

}  
