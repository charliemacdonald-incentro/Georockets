import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare let google: any;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform) {
    platform.ready().then(() => {
      this.initMap()
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  initMap(){
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
  }

}
