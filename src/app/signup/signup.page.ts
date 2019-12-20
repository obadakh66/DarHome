import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastController, NavController } from '@ionic/angular';
import { SystemServicesService } from '../services/system-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../home/categories';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  fatherUsername: string;
  isUser: boolean = false;
  isTechnician: boolean = false;
  isChoosen: boolean = false;
  identityProcessing: boolean = false;
  certificateProcessing: boolean = false;
  idImg;
  certificateImage;
  @ViewChild('bouncebtn', { read: ElementRef, static: false }) bouncebtn: ElementRef;
  title: string;
  body: string;
  public isLoading = true;
  //private user: SocialUser;
  public loginCounter = 0;
  isChild: boolean;
  private loggedIn: boolean;
  signupObject: any[] = [];
  allCategories: Category = new Category();
  userForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    UserPass: new FormControl('', [Validators.required, Validators.minLength(8)]),
    UserPhoneNumber: new FormControl('', Validators.required),
    UserRePass: new FormControl('', Validators.required),

  }, { validators: this.userPassValidator })

  technicianForm = new FormGroup({
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    TechnicianPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    TechnicianPhoneNumber: new FormControl('', Validators.required),
    TechnicianRePassword: new FormControl('', Validators.required),
    ExperienceYears: new FormControl('', Validators.required),
    CategoryType: new FormControl(''),
    Sex: new FormControl('')

  }, { validators: this.technicianPassValidator })


  get Name() {
    return this.userForm.get('Name') as FormControl;
  }
  get UserPass() {
    return this.userForm.get('UserPass') as FormControl;
  }
  get UserPhoneNumber() {
    return this.userForm.get('UserPhoneNumber') as FormControl;
  }
  get UserRePass() {
    return this.userForm.get('UserRePass') as FormControl;
  }
  get FirstName() {
    return this.technicianForm.get('FirstName') as FormControl;
  }
  get LastName() {
    return this.technicianForm.get('LastName') as FormControl;
  }
  get TechnicianPassword() {
    return this.technicianForm.get('TechnicianPassword') as FormControl;

  }
  get TechnicianPhoneNumber() {
    return this.technicianForm.get('TechnicianPhoneNumber') as FormControl;

  }
  get TechnicianRePassword() {
    return this.technicianForm.get('TechnicianRePassword') as FormControl;
  }

  get ExperienceYears() {
    return this.technicianForm.get('ExperienceYears') as FormControl;
  }

  get CategoryType() {
    return this.technicianForm.get('CategoryType') as FormControl;
  }
  get Sex() {
    return this.technicianForm.get('Sex') as FormControl;
  }

  userPassValidator(AC: AbstractControl) {
    let password = AC.get('UserPass').value; // to get value in input tag
    let confirmPassword = AC.get('UserRePass').value; // to get value in input tag
    if (password != confirmPassword) {

      AC.get('UserRePass').setErrors({
        "MatchPassword": true
      });

    } else {

      return null
    }

  }
  technicianPassValidator(AC: AbstractControl) {
    let password = AC.get('TechnicianPassword').value; // to get value in input tag
    let confirmPassword = AC.get('TechnicianRePassword').value; // to get value in input tag
    if (password != confirmPassword) {

      AC.get('TechnicianRePassword').setErrors({
        "MatchPassword": true
      });

    } else {

      return null
    }

  }
  onFileComplete(data: any) {
    console.log(data); // We just print out data bubbled up from event emitter.
  }
  fbUser: any[] = [];
  hide = true;

  constructor(
    private userService: UserService,
    public toastController: ToastController,
    public systemService: SystemServicesService,
    public navCtrl: NavController,
    private route: Router) { }


  ngOnInit() {

  }
  uploadIdentity(str: any) {
    this.identityProcessing = true
    this.idImg = str.target.files[0];
    setTimeout(function () {
      this.identityProcessing = !this.identityProcessing; console.log(this.identityProcessing)
    }, 2000);
  }
  uploadCertificate(str: any) {
    this.certificateProcessing = true
    this.certificateImage = str.target.files[0];
    setTimeout(function () { this.certificateProcessing = !this.certificateProcessing; }, 2000);
  }
  CreateNewUser(isUser) {
    this.isLoading = true;
    var user;
    console.log(this.CategoryType.value)
    console.log(this.Sex.value)
    if (!isUser) {
      if (this.certificateImage && this.idImg) {

        user = {
          firstName: this.FirstName.value,
          lastName: this.LastName.value,
          phoneNumber:'0'+ this.TechnicianPhoneNumber.value.toString(),
          password: this.TechnicianPassword.value,
          categoryType: Number(this.CategoryType.value),
          experianceYears: this.ExperienceYears.value,
          sex: this.Sex.value
        }
        this.userService.createTechnician(user).subscribe(response => {
          this.technicianForm.reset();
          this.uploadPictures(response.id, this.idImg, this.certificateImage)
        });


      }
      else {
        this.systemService.showMessage("حصل خطأ", "صورة الهوية الشخصية وشهادة مزاولة المهنة إجباري", 'danger')
      }
    }
    if (isUser) {
      user = {
        name: this.Name.value,
        password: this.UserPass.value,
        phoneNumber:'0'+ this.UserPhoneNumber.value.toString()
            }
      this.userService.createUser(user).subscribe(response => {


        this.systemService.showMessage("تم التسجيل", "تم التسجيل بنجاح", 'success')
        this.isLoading = false;
        this.technicianForm.reset();
        this.route.navigate(["/login"]);

      }, error => {
        var errormsg = error.error;
        this.isLoading = false;
        this.systemService.showMessage("حصل خطأ", errormsg, 'danger')
      });
    }



  }
  uploadPictures(id, file1, file2) {
    this.userService.saveTechnicianCredntials(id, file1, file2).subscribe(res => {
      this.systemService.showMessage("تم التسجيل", "تم التسجيل بنجاح", 'success')
      this.isLoading = false;
      this.technicianForm.reset();
      this.route.navigate(["/login"]);
    }, error => {
      var errormsg = error.error;
      this.isLoading = false;
      this.systemService.showMessage("حصل خطأ", errormsg, 'danger')
    });
  }

  filterItemsOfType(devalue) {
    if (!devalue) {
      return '';
    }



  }

  navigateToPolicies() {
    this.route.navigate(['/policies'])
  }

}
