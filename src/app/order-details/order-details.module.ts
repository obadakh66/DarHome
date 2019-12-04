import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderDetailsPage } from './order-details.page';
import { DemoMaterialModule } from '../material-module';

const routes: Routes = [
    {
        path: '',
        component: OrderDetailsPage
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
    declarations: [OrderDetailsPage]
})
export class OrderDetailsPageModule { }