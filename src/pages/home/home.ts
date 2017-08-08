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
  channelsList = [];

  constructor(public navCtrl: NavController, private http: Http,
    public loadingCtrl: LoadingController, public alerCtrl: AlertController,
    public platform: Platform) {

  }



  ionViewDidLoad() {

    var self = this;
    this.makeChannelListRequest(function (res, data) {

      console.log("Channel List res : ", res);
      console.log("Channel List Response : ", JSON.stringify(data));

      if (res == "success") {

        if (data.responseCode == 200) {

          self.channelsList = data.channels;
          self.channelsList.sort((a, b) => {
            if (a.channelTitle.toLowerCase() < b.channelTitle.toLowerCase()) return -1;
            if (a.channelTitle.toLowerCase() > b.channelTitle.toLowerCase()) return 1;
            return 0;
          });

        } else {
          self.showAlert("Error", data.responseMessage);
        }

      } else {
        self.showAlert("Error", data);
      }
    });
  }




  //==================== Login WebService Request ===================================


  makeChannelListRequest(callback) {

    var self = this;
    self.presentLoading();

    this.http.get(this.getChannelListURL)
      .map(res => res.json())
      .subscribe((data) => {
        self.loader.dismiss();
        callback("success", data);
      },
      (err) => {
        self.loader.dismiss();
        callback("error", err);
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
