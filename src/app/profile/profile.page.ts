import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RateDialogPage } from '../rate-dialog/rate-dialog/rate-dialog.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private authService: AuthServiceService,private route:ActivatedRoute,public dialog: MatDialog,private router:Router) { }
  currentUserId: number;
  passedUserId:number;
  loggedInUser;
  ngOnInit() {
    /* this.currentUserId=this.authService.getLoggedInUserId()
    this.loggedInUser=JSON.parse(localStorage.getItem("currentUser")); */
    this.fetchPassedUserId();
  }

  isLoggedIn() {
    this.authService.isLoggedin();
  }
  fetchPassedUserId(){
    this.route.params.subscribe(param=>{
      this.passedUserId=param.id;
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RateDialogPage, {
      width: '350px',
      height:'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }


}  
