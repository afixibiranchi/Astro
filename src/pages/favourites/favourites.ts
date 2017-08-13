import { HomePage } from './../home/home';
import { DataHolderProvider } from './../../providers/DataHolderProvider';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {

  favouritesLocalStorageKey = "MyFavouritesChannels";
  favouritesChannelsList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dataHolder: DataHolderProvider) {
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

}
