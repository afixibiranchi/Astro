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
  sortChannel = 'channelName';

  favouritesLocalStorageKey = "MyFavouritesChannels";
  favouritesChannelsList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dataHolder: DataHolderProvider, public loadingCtrl: LoadingController,
    public alerCtrl: AlertController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FavouritesPage');
  }


  ionViewDidEnter() {

    var self = this;
    this.getListOfFavouritesChannels(function (result, data) {

      console.log("favouritesChannelsList result in Favourites : ", result);
      if (data) {
        self.favouritesChannelsList = data;

        self.segmentChangeAction();

      }
      //console.log("favouritesChannelsList in Favourites : ", JSON.stringify(self.favouritesChannelsList));
    });
  }



  //==================== Get list of Fav Channels Start ===================================

  getListOfFavouritesChannels(callback) {
    this.dataHolder.retrieveFromLocalStorage(this.favouritesLocalStorageKey, function (result, data) {
      callback(result, data);
    });
  }

  //==================== Get list of Fav Channels End ===================================



  //==================== Show Channels list page Start ===================================

  showChannelsListPage() {
    this.navCtrl.push(HomePage);
  }

  //==================== Show Channels list page End ===================================




  //==================== Remove Channel from Favourites Start ===================================

  removeChannelFromFavourites(channelItem) {

    //console.log("Channel item to be deleted : ", JSON.stringify(channelItem));

    var indexOfItem = -1;
    for (var i = 0; i < this.favouritesChannelsList.length; i++) {

      var item = this.favouritesChannelsList[i];
      if (channelItem.channelId == item["channelId"]) {
        indexOfItem = i;
      }
    }

    if (indexOfItem != -1) {
      this.favouritesChannelsList.splice(indexOfItem, 1);

      this.dataHolder.saveToLocalStorage(this.favouritesLocalStorageKey, this.favouritesChannelsList, function (result, data) {
        //console.log("Favourite Channel saved to LocalStorage result :", result);
      });

    }

    console.log("Index of item to be deleted : ", indexOfItem);

  }

  //==================== Remove Channel from Favourites End ===================================







  //==================== Sort Favourite Channels Start ===================================

  segmentChangeAction() {

    if (this.sortChannel == "channelName") {

      this.favouritesChannelsList.sort((a, b) => {
        if (a.channelTitle.toLowerCase() < b.channelTitle.toLowerCase()) return -1;
        if (a.channelTitle.toLowerCase() > b.channelTitle.toLowerCase()) return 1;
        return 0;
      });

    } else {

      this.favouritesChannelsList.sort((a, b) => {
        if (a.channelId < b.channelId) return -1;
        if (a.channelId > b.channelId) return 1;
        return 0;
      });

    }

  }


  //==================== Sort Favourite Channels End ===================================




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
