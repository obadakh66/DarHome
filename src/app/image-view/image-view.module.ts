import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ImageViewPage } from './image-view.page';
import { DemoMaterialModule } from '../material-module';

const routes: Routes = [
  {
    path: '',
    component: ImageViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DemoMaterialModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ImageViewPage]
})
export class ImageViewPageModule {}
