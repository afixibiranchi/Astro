import { DataHolderProvider } from './../../providers/DataHolderProvider';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Platform } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loader: any;
  channelsList = [];
  sortChannel = 'channelName';

  favouritesLocalStorageKey = "MyFavouritesChannels";
  favouritesChannelsList = [];


  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController, public alerCtrl: AlertController,
    public platform: Platform, public dataHolder: DataHolderProvider) {

  }



  ionViewDidLoad() {
    console.log("Inside viewDidLoad of Home page");
  }


  ionViewDidEnter() {

    var self = this;

    //----------- Favourites Channels List Start -------------

    this.getListOfFavouritesChannels(function (result, data) {

      //console.log("favouritesChannelsList result in Home : ", result);
      if (data) {
        self.favouritesChannelsList = data;
      }
      //console.log("favouritesChannelsList in Home: ", JSON.stringify(self.favouritesChannelsList));
    });

    //----------- Favourites Channels List End -------------



    this.presentLoading();

    this.getListOfAllChannels(function (result, data) {

      self.loader.dismiss();

      if (result == "success") {
        self.channelsList = data;
        self.channelsList.sort((a, b) => {
          if (a.channelTitle.toLowerCase() < b.channelTitle.toLowerCase()) return -1;
          if (a.channelTitle.toLowerCase() > b.channelTitle.toLowerCase()) return 1;
          return 0;
        });

      } else {
        self.showAlert("Error", data);
      }

    });


  }



  //==================== Get List of All Channels Start ===================================

  getListOfAllChannels(callback) {

    this.dataHolder.getAllChannelsListFromDataHolder(function (result, data) {
      callback(result, data);
    });

  }

  //==================== Get List of All Channels End ===================================






  //==================== Segment Change Action Start ===================================

  segmentChangeAction() {

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

  //==================== Segment Change Action End ===================================




  //==================== Favourites Channels List Start ===================================

  getListOfFavouritesChannels(callback) {
    this.dataHolder.retrieveFromLocalStorage(this.favouritesLocalStorageKey, function (result, data) {
      callback(result, data);
    });
  }

  //==================== Favourites Channels List End ===================================



  //==================== Add to Favourites Start ===================================

  addToFavourites(channelItem) {
    //console.log("Add to favourites : ", JSON.stringify(channelItem));

    this.favouritesChannelsList.push(channelItem);

    this.dataHolder.saveToLocalStorage(this.favouritesLocalStorageKey, this.favouritesChannelsList, function (result, data) {
      console.log("Favourite Channel saved to LocalStorage result :", result);
    });

    this.showAlert("", "Channel added to favourite list");
  }

  //==================== Add to Favourites End ===================================




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
