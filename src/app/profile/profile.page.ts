import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RateDialogPage } from '../rate-dialog/rate-dialog/rate-dialog.page';
import { UserService } from '../services/user.service';
import { Category } from '../home/categories';

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
      this.isUser=param.isUser;
      console.log(this.isUser)
      if (this.isUser=='true') {
        this.getUserById();
      }
      if (this.isUser=='false') {
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
      console.log('The dialog was closed');

    });
  }
  allCategories: Category = new Category();

  getCategoryName(id) {
    let category = this.allCategories.categories.find(x => x.id == id);
    return category.name;
  }
  getCategoryImage(id) {
    let category = this.allCategories.categories.find(x => x.id == id);
    return category.imageUrl;
  }

}  
