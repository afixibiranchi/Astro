import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataHolderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DataHolderProvider {

  getChannelListURL = "http://ams-api.astro.com.my/ams/v3/getChannelList";

  constructor(public http: Http) {
    console.log('Hello DataHolderProvider Provider');
  }




  //==================== ChannelsList WebService Request Start ===================================


  makeChannelListRequest(callback) {

    var self = this;

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





}
