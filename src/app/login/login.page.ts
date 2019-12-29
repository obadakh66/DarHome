import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { SystemServicesService } from '../services/system-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private userService: UserService,
    private router: Router,
    public navCtrl: NavController,
    public systemService: SystemServicesService,
    public loadingController: LoadingController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.loginForm.reset();

  }
  loginForm = new FormGroup
    ({
      phoneNumber: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })

  get phoneNumber() {
    return this.loginForm.get('phoneNumber') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }
  login() {
    this.systemService.showLoader("يرجى الإنتظار");
    
    this.userService.login(this.loginForm.value).subscribe(response => {
      console.log(response)
      localStorage.setItem("currentUser", JSON.stringify(response));
      if (response.firstName) {
        this.systemService.hideLoader();
        location.assign("/profile/"+response.id+"/false/true");
      }
      else if(response.isAdmin){
        this.systemService.hideLoader();
        location.assign("/admin")
      }
      else {
        this.systemService.hideLoader();
        location.assign("/home")
      }
    }, error => {
      this.systemService.hideLoader();

      this.systemService.showMessage("حصل خطأ", error.error, 'danger')
    });


  }

}
