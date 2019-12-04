import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rate-dialog',
  templateUrl: './rate-dialog.page.html',
  styleUrls: ['./rate-dialog.page.scss'],
})
export class RateDialogPage implements OnInit {


  onNoClick(): void {
    this.dialogRef.close();
  }
  //-------------------------------
  ratingValue: any;
  title: any;
  id: any;
  body: any;
  constructor(
    public dialogRef: MatDialogRef<RateDialogPage>) { }

  ngOnInit() {
  }

  
  setradio(st) {
    this.ratingValue = st;
    return this.ratingValue;
  }
  closeModal() {
    this.dialogRef.close(this.ratingValue)
  }
  
}
