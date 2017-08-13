import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DataHolderProvider {

  //http://whatson.astro.com.my/tv-guide

  getChannelListURL = "http://ams-api.astro.com.my/ams/v3/getChannelList";
  getChannelsURL = "http://ams-api.astro.com.my/ams/v3/getChannels";
  getEventsURL = "http://ams-api.astro.com.my/ams/v3/getEvents?";


  channelsList = [];
  channelsArr = [];

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
    var url = this.getChannelListURL;
    this.makeHTTPGetRequest(url, function (result, data) {
      callback(result, data);
    });

  }

  //==================== ChannelsList WebService Request End ===================================






  //==================== GetChannels WebService Request Start ===================================

  getChannels(callback) {

    if (this.channelsArr.length == 0) {
      var self = this;
      var url = this.getChannelsURL;
      this.makeHTTPGetRequest(url, function (result, data) {
        if (result == "success") {
          self.channelsArr = data;
        }
        callback(result, data);
      });
    } else {
      callback("success", this.channelsArr);
    }

  }

  //==================== GetChannels WebService Request End ===================================







  //==================== GetEvents WebService Request Start ===================================

  getEvents(params, callback) {

    var url = this.getEventsURL;

    if (params && params.length) {
      url += params;
    }

    // console.log("GetEvents URL : ", url);

    this.makeHTTPGetRequest(url, function (result, data) {
      callback(result, data);
    });

  }

  //==================== GetEvents WebService Request End ===================================







  //============== HTTP Get Request Start ===============

  makeHTTPGetRequest(url, callback) {

    this.http.get(url)
      .map(res => res.json())
      .subscribe((data) => {
        callback("success", data);
      },
      (err) => {
        callback("error", err);
      });

  }

  //============== HTTP Get Request End ===============





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
