import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DataHolderProvider {

  //http://whatson.astro.com.my/tv-guide
  getChannelListURL = "http://ams-api.astro.com.my/ams/v3/getChannelList";

  constructor(public http: Http) {
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





}
