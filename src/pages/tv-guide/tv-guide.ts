import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { DataHolderProvider } from './../../providers/DataHolderProvider';

@Component({
  selector: 'page-tv-guide',
  templateUrl: 'tv-guide.html',
})

export class TvGuidePage {

  loader: any;
  channelsArr = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dataHolder: DataHolderProvider, public loadingCtrl: LoadingController,
    public alerCtrl: AlertController) {

    this.channelsArr = this.navParams.get("channelsArr");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TvGuidePage');
  }


  ionViewDidEnter() {

    console.log("ChannelsArr length : ", this.channelsArr.length);

    var params = "channelId=[1,2,3]&periodStart=2017-08-14&periodEnd=2017-08-20";

    this.dataHolder.getEvents(params, function (result, data) {
      console.log("Events result : ", result);
      console.log("Events response : ", JSON.stringify(data));
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
