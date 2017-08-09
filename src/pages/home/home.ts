import { DataHolderProvider } from './../../providers/DataHolderProvider';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Platform } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // getChannelListURL = "http://ams-api.astro.com.my/ams/v3/getChannelList";

  loader: any;
  channelsList = [];
  sortChannel = 'channelName';


  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController, public alerCtrl: AlertController,
    public platform: Platform, public dataHolder: DataHolderProvider) {

  }



  ionViewDidLoad() {

    var self = this;
    this.presentLoading();

    this.dataHolder.makeChannelListRequest(function (res, data) {

      self.loader.dismiss();

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





  segementChangeAction() {

    if (this.sortChannel == "channelName") {

      this.channelsList.sort((a, b) => {
        if (a.channelTitle.toLowerCase() < b.channelTitle.toLowerCase()) return -1;
        if (a.channelTitle.toLowerCase() > b.channelTitle.toLowerCase()) return 1;
        return 0;
      });

    } else {

      this.channelsList.sort((a, b) => {
        if (a.channelId < b.channelId) return -1;
        if (a.channelId > b.channelId) return 1;
        return 0;
      });

    }

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
