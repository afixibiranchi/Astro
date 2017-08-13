import { HomePage } from './../home/home';
import { DataHolderProvider } from './../../providers/DataHolderProvider';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {

  loader: any;
  favouritesLocalStorageKey = "MyFavouritesChannels";
  favouritesChannelsList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dataHolder: DataHolderProvider, public loadingCtrl: LoadingController,
    public alerCtrl: AlertController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FavouritesPage');

    var self = this;
    this.getListOfFavouritesChannels(function (result, data) {

      console.log("favouritesChannelsList result in Favourites : ", result);
      if (data) {
        self.favouritesChannelsList = data;
      }
      console.log("favouritesChannelsList in Favourites : ", JSON.stringify(self.favouritesChannelsList));
    });
  }


  getListOfFavouritesChannels(callback) {
    this.dataHolder.retrieveFromLocalStorage(this.favouritesLocalStorageKey, function (result, data) {
      callback(result, data);
    });
  }


  showChannelsListPage() {
    this.navCtrl.push(HomePage);
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
