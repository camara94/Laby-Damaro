import { HttpModule } from '@angular/http';
import { ContactPage } from './../pages/contact/contact';
import { AboutPage } from './../pages/about/about';
import { MenuPage } from './../pages/menu/menu';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from "@ionic/storage";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DishdetailPage } from "../pages/dishdetail/dishdetail";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import  { LocalNotifications } from "@ionic-native/local-notifications";
import { EmailComposer } from "@ionic-native/email-composer";
import { SocialSharing } from "@ionic-native/social-sharing";
import { Camera } from "@ionic-native/camera";
import { Network } from "@ionic-native/network";
import { CallNumber } from "@ionic-native/call-number";

import { baseURL } from './../pages/shared/baseurl';
import { DishProvider } from '../providers/dish/dish';
import { LeaderProvider } from '../providers/leader/leader';
import { PromotionProvider } from '../providers/promotion/promotion';
import { ProcessHttpmsgProvider } from '../providers/process-httpmsg/process-httpmsg';
import {ContactService} from "../pages/Services/contact.service";
import { ServicesProvider } from '../providers/services/services';
import { FavoritesProvider } from '../providers/favorites/favorites';
import {FavoritesPage} from "../pages/favorites/favorites";
import {ReservationPage} from "../pages/reservation/reservation";
import {AddcommentPage} from "../pages/addcomment/addcomment";
import {LoginPage} from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    ContactPage,
    MenuPage,
    DishdetailPage,
    FavoritesPage,
    ReservationPage,
    AddcommentPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    ContactPage,
    MenuPage,
    DishdetailPage,
    FavoritesPage,
    ReservationPage,
    AddcommentPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    ContactService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,
    EmailComposer,
    SocialSharing,
    Camera,
    Network,
    CallNumber,
    { provide: 'BaseURL', useValue: baseURL },
    DishProvider,
    LeaderProvider,
    PromotionProvider,
    ProcessHttpmsgProvider,
    ServicesProvider,
    FavoritesProvider
  ]
})
export class AppModule {}
