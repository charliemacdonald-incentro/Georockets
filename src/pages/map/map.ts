import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation";
import {Device} from "@ionic-native/device";
// import * as firebase from "firebase/app";
import * as firebase from "firebase";

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
  markers = [];
  ref = firebase.database().ref('geolocations/');

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              private geolocation: Geolocation,
              private device: Device) {

    this.ref.on('value', resp => {
      this.deleteMarkers();
      snapshotToArray(resp).forEach(data => {
        if (data.uuid !== this.device.uuid) {
          let image = 'assets/imgs/orangemarker.png';
          let updatelocation = new google.maps.LatLng(data.latitude, data.longitude);
          this.addMarker(updatelocation, image);
          this.setMapOnAll(this.map);
          console.log('updatelocation = ' + updatelocation);
        } else {
          let image = 'assets/imgs/orangemarker.png';
          let updatelocation = new google.maps.LatLng(data.latitude, data.longitude);
          this.addMarker(updatelocation, image);
          this.setMapOnAll(this.map);
        }
      });
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then((position) => {
      }).catch((error) => {
        console.log('Error getting location', error);
      });
      this.initMap()
    });

    // this.getLocation().then(res => {
    //   console.log(res.coords.latitude);
    //   console.log(res.coords.longitude);
    // }).catch(err => {
    //   console.log(err);
    // })
  }

  getLocation() {
    return this.geolocation.getCurrentPosition();
  }

  initMap() {
    this.geolocation.getCurrentPosition(
      {
        maximumAge: 3000,
        timeout: 5000,
        enableHighAccuracy: true
      }).then((resp) => {
      let mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      console.log('my location' + mylocation);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 15,
        center: mylocation
      });
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deleteMarkers();
      this.updateGeolocation(this.device.uuid, data.coords.latitude,data.coords.longitude);
      let updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      let image = 'assets/imgs/orangemarker.png';
      this.addMarker(updatelocation, image);
      this.setMapOnAll(this.map);
    });
  }

  addMarker(location, image) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image
    });
    this.markers.push(marker);
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  updateGeolocation(uuid, lat, lng) {
    let mykeyLocalStorage = localStorage.getItem('mykey');
    if (localStorage.getItem('mykey')) {
      firebase.database().ref('geolocations/' + localStorage.getItem('mykey')).set({
        uuid: uuid,
        latitude: lat,
        longitude: lng
      });
      console.log('get key localstorage is' + mykeyLocalStorage);
    } else {
      let newData = this.ref.push();
      newData.set({
        uuid: uuid,
        latitude: lat,
        longitude: lng
      });
      localStorage.setItem('mykey', newData.key);
      console.log('newdata = ' + newData.key);
    }
  }
}
  export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });
    console.log('returnarray = ' + returnArr);
    return returnArr;
  };





