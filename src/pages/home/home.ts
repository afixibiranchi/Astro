import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Platform } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  getChannelListURL = "http://ams-api.astro.com.my/ams/v3/getChannelList";

  loader: any;

  constructor(public navCtrl: NavController, private http: Http,
    public loadingCtrl: LoadingController, public alerCtrl: AlertController,
    public platform: Platform) {

  }







  //==================== Login WebService Request ===================================


  makeChannelListRequest(callback) {

    var self = this;
    self.presentLoading();

    this.http.get(this.getChannelListURL)
      .map(res => res.json())
      .subscribe((data) => {
        self.loader.dismiss();
        console.log("Channel List Response : ", JSON.stringify(data));

      },
      (err) => {
        self.loader.dismiss();
        console.log("Login Error : ", err);
      });
  }






  //==================== Loader Start ===================================


  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading...",
    });
    this.loader.present();
  }

  //==================== Loader End ===================================





  //======================= Show Alert Start ================================

  showAlert(alertTitle = 'Error!', alertMessage = 'Missing Data') {
    let alert = this.alerCtrl.create({
      title: alertTitle,
      message: alertMessage,
      buttons: ['OK']
    });
    alert.present()
  }

  //======================= Show Alert End ================================



}
