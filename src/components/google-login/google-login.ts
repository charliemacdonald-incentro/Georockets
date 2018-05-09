import { Component } from '@angular/core';
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase";
import {AngularFireAuth} from "angularfire2/auth";
import {GooglePlus} from "@ionic-native/google-plus";
import {Platform} from "ionic-angular";

/**
 * Generated class for the GoogleLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})
export class GoogleLoginComponent {

  user: Observable<firebase.User>

  constructor(private angularfireAuth: AngularFireAuth,
              private googlePlus: GooglePlus,
              private platform: Platform) {

    console.log('Hello GoogleLoginComponent Component');
    this.user = this.angularfireAuth.authState;
  }

  async nativeGoogleLogin(): Promise<void>{
    try {
      const gplusUser = await this.googlePlus.login({
        'webClientId': '841855342223-i1liklua1pbibn22j307lnle679jo26c.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })
      return await this.angularfireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
    }   catch(error){
      console.log(error);
    }
  }

  async webGoogleLogin(): Promise<void>{
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.angularfireAuth.auth.signInWithPopup(provider);
    } catch(error){
      console.log(error);
    }
  }

  googleLogin(){
    if(this.platform.is('cordova')){
      this.nativeGoogleLogin()
    } else {
      this.webGoogleLogin();
    }
  }

  signOut(){
    this.angularfireAuth.auth.signOut();
  }

}
