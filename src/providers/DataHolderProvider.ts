import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DataHolderProvider {

  //http://whatson.astro.com.my/tv-guide
  getChannelListURL = "http://ams-api.astro.com.my/ams/v3/getChannelList";

  channelsList = [];


  constructor(public http: Http, public storage: Storage) {
    console.log('Hello DataHolderProvider Provider');
  }



  getAllChannelsListFromDataHolder(callback) {

    if (this.channelsList.length == 0) {

      //----------- All Channels List Start -------------

      var self = this;

      this.makeChannelListRequest(function (res, data) {

        console.log("Channel List res : ", res);
        //console.log("Channel List Response : ", JSON.stringify(data));

        if (res == "success") {

          if (data.responseCode == 200) {

            self.channelsList = data.channels;
            callback("success", self.channelsList);

            // self.channelsList.sort((a, b) => {
            //   if (a.channelTitle.toLowerCase() < b.channelTitle.toLowerCase()) return -1;
            //   if (a.channelTitle.toLowerCase() > b.channelTitle.toLowerCase()) return 1;
            //   return 0;
            // });

          } else {
            //self.showAlert("Error", data.responseMessage);
            callback("Error", data.responseMessage);
          }

        } else {
          // self.showAlert("Error", data);
          callback("Error", data);

        }
      });

      //----------- All Channels List End -------------

    } else {

      callback("success", this.channelsList);
    }

  }








  //==================== ChannelsList WebService Request Start ===================================


  makeChannelListRequest(callback) {

    //console.log("making makeChannelListRequest to server....");
    this.http.get(this.getChannelListURL)
      .map(res => res.json())
      .subscribe((data) => {
        callback("success", data);
      },
      (err) => {
        callback("error", err);
      });
  }

  //==================== ChannelsList WebService Request End ===================================





  //====================== Save to LocalStorage Start =================================


  saveToLocalStorage(key, data, callback) {

    this.storage.set(key, data).then((result) => {
      //console.log("+++++ Data Saved in Local Storage : " + JSON.stringify(data));
      callback("success", result);
    }).catch((error) => {
      console.log("Error while saving data in Local Storage : ", error);
      callback("error", error);
    });

  }



  retrieveFromLocalStorage(key, callback) {

    this.storage.get(key).then((result) => {
      callback("success", result);
    }).catch((error) => {
      console.log("Error while retrieving data from Local Storage : ", error);
      callback("error", error);
    });

  }



  removeFromLocalStorage(key, callback) {

    this.storage.remove(key).then((result) => {
      callback("success", result);
    }).catch((error) => {
      console.log("Error while removing data from Local Storage : ", error);
      callback("error", error);
    });

  }


  //====================== Save to LocalStorage End  (Browser) =================================



}
