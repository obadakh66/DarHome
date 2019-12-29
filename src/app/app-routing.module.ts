import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  { 
    path: 'profile', 
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  { 
    path: 'profile/:id/:isUser/:isOwner', 
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  { path: 'new-order/:categoryId', loadChildren: './new-order/new-order.module#NewOrderPageModule' },
  { path: 'order-details/:orderId', loadChildren: './order-details/order-details.module#OrderDetailsPageModule' },
  { path: 'tech-orders/:techId', loadChildren: './tech-orders/tech-orders.module#TechOrdersPageModule' },
  { path: 'about-us', loadChildren: './about-us/about-us.module#AboutUsPageModule' },
  { path: 'order-success/:phoneNumber', loadChildren: './order-success/order-success.module#OrderSuccessPageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' },
  { path: 'image-view/:techId', loadChildren: './image-view/image-view.module#ImageViewPageModule' }




 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
