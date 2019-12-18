import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import * as Bounce from 'bounce.js';

@Injectable({
  providedIn: 'root'
})
export class SystemServicesService {

  constructor(public toastController: ToastController, private loadingController: LoadingController) { }
  public static isProgressed: boolean;
  headerValue;
  public async showMessage(header, message, color) {
    const toast = await this.toastController.create({
      header: header,
      message: message,
      position: 'middle',
      duration: 2000,
      color: color
    });
    toast.present();
  }
  showLoader(msg) {
    this.loadingController.create({
      message: msg,
      spinner: 'bubbles',
    }).then((res) => {
      res.present();
    });
  }

  async hideLoader() {
    await this.loadingController.dismiss();
  }

  setHeaderValue(value) {
    this.headerValue = value;
  }
  getHeaderValue() {
    return this.headerValue;
  }
  bounce(bouncebtn) {
    var bounce = new Bounce();
    bounce
      .translate({
        from: { x: -300, y: 0 },
        to: { x: 0, y: 0 },
        duration: 600,
        stiffness: 4
      })
      .scale({
        from: { x: 1, y: 1 },
        to: { x: 0.1, y: 2.3 },
        easing: 'sway',
        duration: 800,
        delay: 65,
        stiffness: 2
      })
      .scale({
        from: { x: 1, y: 1 },
        to: { x: 5, y: 1 },
        easing: 'sway',
        duration: 300,
        delay: 30,
      })
      .applyTo(bouncebtn.nativeElement);
  }


  // startProgress()
  // {
  //   this.isProgressed=true;
  //   return this.isProgressed
  // }
  // stopProgress()
  // {
  //   this.isProgressed=false;
  //   return this.isProgressed
  // }
}
