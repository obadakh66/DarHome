import { DemoMaterialModule } from './material-module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './services/user.service';
import { OrderService } from './services/order.service';
import { AuthServiceService } from './services/auth-service.service';
import { RatingService } from './services/rating.service';
import { RateDialogPage } from './rate-dialog/rate-dialog/rate-dialog.page';
export function tokenGetter() {
  return localStorage.getItem('jwt');
}
@NgModule({
  declarations: [AppComponent,RateDialogPage],
  entryComponents: [RateDialogPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      } 
    }),
    HttpClientModule,
    DemoMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    OrderService,
    NavController,
    AuthServiceService,
    RatingService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
