import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import {LoginPage} from "../pages/login/login";
import {LoginPageModule} from "../pages/login/login.module";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {GoogleLoginComponent} from "../components/google-login/google-login";
import {GooglePlus} from "@ionic-native/google-plus";
import {Geolocation} from "@ionic-native/geolocation";
import {Device} from "@ionic-native/device";

const firebaseConfig = {
  apiKey: "AIzaSyCcbN0wlSN_qyQzWcGU6kwH19ilODnAWNw",
  authDomain: "georockets-35e22.firebaseapp.com",
  databaseURL: "https://georockets-35e22.firebaseio.com",
  projectId: "georockets-35e22",
  storageBucket: "georockets-35e22.appspot.com",
  messagingSenderId: "171615817472"
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
    Geolocation,
    Device
  ]
})
export class AppModule {}
