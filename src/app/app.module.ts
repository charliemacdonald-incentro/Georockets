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

const firebaseConfig = {
    apiKey: "AIzaSyBXRLNRMahmD8AZIp2Yo-J8EJe_VI7sF7E",
    authDomain: "incentro-georockets.firebaseapp.com",
    databaseURL: "https://incentro-georockets.firebaseio.com",
    projectId: "incentro-georockets",
    storageBucket: "incentro-georockets.appspot.com",
    messagingSenderId: "841855342223"
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
    Geolocation
  ]
})
export class AppModule {}
