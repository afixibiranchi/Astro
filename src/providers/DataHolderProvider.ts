import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DataHolderProvider {

  //http://whatson.astro.com.my/tv-guide
  getChannelListURL = "http://ams-api.astro.com.my/ams/v3/getChannelList";

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello DataHolderProvider Provider');
  }




  //==================== ChannelsList WebService Request Start ===================================


  makeChannelListRequest(callback) {

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
