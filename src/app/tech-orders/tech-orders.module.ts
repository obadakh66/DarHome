import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TechOrdersPage } from './tech-orders.page';
import { DemoMaterialModule } from '../material-module';

const routes: Routes = [
  {
    path: '',
    component: TechOrdersPage
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
  declarations: [TechOrdersPage]
})
export class TechOrdersPageModule {}
