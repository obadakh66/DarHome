import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AboutUsPage } from './about-us.page';
import { DemoMaterialModule } from '../material-module';

const routes: Routes = [
  {
    path: '',
    component: AboutUsPage
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DemoMaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AboutUsPage]
})
export class AboutUsPageModule {}
