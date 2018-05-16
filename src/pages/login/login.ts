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
      return await this.angularfireAuth.auth.signInAndRetrieveDataWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
    } catch (error){
      console.log(error);
    }
    console.log('nativegooglelogin success');
    this.gotoNextPage();
  }

  async webGoogleLogin(): Promise<void>{
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.angularfireAuth.auth.signInWithPopup(provider);
    } catch(error) {
      console.log(error);
    }
    this.gotoNextPage();
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

  gotoNextPage(){
    this.navCtrl.setRoot('TabsPage');
  }

}
