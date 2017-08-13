import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { DataHolderProvider } from './../../providers/DataHolderProvider';
import { TvGuidePage } from './../tv-guide/tv-guide';

@Component({
  selector: 'page-tv-channels',
  templateUrl: 'tv-channels.html',
})
export class TvChannelsPage {

  loader: any;
  channelsArr = [];

  sortChannel = 'channelNumber';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dataHolder: DataHolderProvider, public loadingCtrl: LoadingController,
    public alerCtrl: AlertController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TvChannelsPage');
  }


  ionViewDidEnter() {

    var self = this;
    this.presentLoading();

    this.dataHolder.getChannels(function (result, data) {
      self.loader.dismiss();

      if (result == "success") {
        self.channelsArr = data["channel"];
        self.channelsArr.sort((a, b) => {
          if (a.channelId < b.channelId) return -1;
          if (a.channelId > b.channelId) return 1;
          return 0;
        });
      }
      //console.log("Channels response : ", JSON.stringify(self.channelsArr));


    });
  }







  //==================== Segment Change Action Start ===================================

  segmentChangeAction() {

    if (this.sortChannel == "channelName") {

      this.channelsArr.sort((a, b) => {
        if (a.channelTitle.toLowerCase() < b.channelTitle.toLowerCase()) return -1;
        if (a.channelTitle.toLowerCase() > b.channelTitle.toLowerCase()) return 1;
        return 0;
      });

    } else {

      this.channelsArr.sort((a, b) => {
        if (a.channelId < b.channelId) return -1;
        if (a.channelId > b.channelId) return 1;
        return 0;
      });

    }

  }

  //==================== Segment Change Action End ===================================




  showTVGuidePage() {
    this.navCtrl.push(TvGuidePage, { channelsArr: this.channelsArr });
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

  showAlert(alertTitle = '', alertMessage = 'Missing Data') {
    let alert = this.alerCtrl.create({
      title: alertTitle,
      message: alertMessage,
      buttons: ['OK']
    });
    alert.present()
  }

  //======================= Show Alert End ================================

}
