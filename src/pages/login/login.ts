import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {GooglePlus} from "@ionic-native/google-plus";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: Observable<firebase.User>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private angularfireAuth: AngularFireAuth,
              private googleplus: GooglePlus,
              private platform: Platform) {

    this.user = this.angularfireAuth.authState;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async nativeGoogleLogin(): Promise<void>{
    try {
      const gplusUser = await this.googleplus.login({
        'webClientId': '841855342223-i1liklua1pbibn22j307lnle679jo26c.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })
      console.log('nativegooglelogin success');
      this.navCtrl.setRoot('TabsPage');
      return await this.angularfireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
    } catch (error){
      console.log(error);
    }
  }

  async webGoogleLogin(): Promise<void>{
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.angularfireAuth.auth.signInWithPopup(provider);
      console.log('webgooglelogin success');
      this.navCtrl.setRoot('TabsPage');
    } catch(error) {
      console.log(error);
    }
  }

  googleLogin(){
    if(this.platform.is('cordova')){
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin()
    }
  }

  googleLogout(){
    this.angularfireAuth.auth.signOut();
  }
  doLogin(){
    this.navCtrl.setRoot('TabsPage');
  }

}
