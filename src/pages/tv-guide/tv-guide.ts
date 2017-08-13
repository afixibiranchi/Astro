import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { DataHolderProvider } from './../../providers/DataHolderProvider';

@Component({
  selector: 'page-tv-guide',
  templateUrl: 'tv-guide.html',
})

export class TvGuidePage {

  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dataHolder: DataHolderProvider, public loadingCtrl: LoadingController,
    public alerCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TvGuidePage');
  }


  ionViewDidEnter() {

    var self = this;
    this.presentLoading();

    this.dataHolder.getChannels(function (result, data) {
      self.loader.dismiss();
      console.log("Channels response : ", JSON.stringify(data));
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
