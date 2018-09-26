import { HttpModule } from '@angular/http';
import { ContactPage } from './../pages/contact/contact';
import { AboutPage } from './../pages/about/about';
import { MenuPage } from './../pages/menu/menu';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DishdetailPage } from "../pages/dishdetail/dishdetail";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
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


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    ContactPage,
    MenuPage,
    DishdetailPage,
    FavoritesPage,
    ReservationPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
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
    ReservationPage
  ],
  providers: [
    StatusBar,
    ContactService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: 'BaseURL', useValue: baseURL },
    DishProvider,
    LeaderProvider,
    PromotionProvider,
    ProcessHttpmsgProvider,
    ProcessHttpmsgProvider,
    ServicesProvider,
    FavoritesProvider
  ]
})
export class AppModule {}
